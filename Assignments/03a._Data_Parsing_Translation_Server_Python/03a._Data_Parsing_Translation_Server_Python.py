from fastapi import FastAPI
import httpx

app = FastAPI()

# Server A URL
SERVER_A_URL = "http://localhost:5000"

# Endpoint to fetch XML data from Server A
@app.get('/xml')
async def get_xml():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/xml")
        return response.json()

# Endpoint to fetch CSV data from Server A
@app.get('/csv')
async def get_csv():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/csv")
        return response.json()

# Endpoint to fetch YAML data from Server A
@app.get('/yaml')
async def get_yaml():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/yaml")
        return response.json()

# Endpoint to fetch TXT data from Server A
@app.get('/txt')
async def get_txt():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/text")
        return response.text

# Endpoint to fetch JSON data from Server A
@app.get('/json')
async def get_json():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/json")
        return response.json()

# Route to act as a client for Server A
@app.get('/from-server-a')
async def get_data_from_server_a():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SERVER_A_URL}/from-server-b")
        return response.json()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
