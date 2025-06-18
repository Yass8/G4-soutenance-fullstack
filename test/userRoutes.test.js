//tester la route get /users
test('GET /users', async () => {
    const response = await fetch('http://127.0.0.1:3000/users');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
}
);