import { PubSub } from 'graphql-subscriptions'; // Import PubSub from graphql-subscriptions
import { books, authors } from './data.js';

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id === args.id),
    authors: () => authors,
    author: (parent, args) => authors.find(author => author.id === args.id),
  },
  Mutation: {
    createBook: (parent, args) => {
      const newBook = {
        id: `${books.length + 1}`,
        title: args.title,
        releaseYear: args.releaseYear,
        authorId: args.authorId,
      };
      books.push(newBook);
      pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      return newBook;
    },
    updateBook: (parent, args) => {
      const book = books.find(book => book.id === args.id);
      if (book) {
        if (args.title !== undefined) book.title = args.title;
        if (args.releaseYear !== undefined) book.releaseYear = args.releaseYear;
        if (args.authorId !== undefined) book.authorId = args.authorId;
      }
      return book;
    },
    deleteBook: (parent, args) => {
      const index = books.findIndex(book => book.id === args.id);
      if (index !== -1) {
        books.splice(index, 1);
        return { message: 'Book deleted successfully' };
      }
      return { message: 'Book not found' };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
  Book: {
    author: (parent) => authors.find(author => author.id === parent.authorId),
  },
  Author: {
    books: (parent) => books.filter(book => book.authorId === parent.id),
  },
};

export default resolvers;
