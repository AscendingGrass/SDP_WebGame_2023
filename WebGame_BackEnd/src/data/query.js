db.users.insertMany([
    {
        "username": "adminITLAND",
        "password": "ITLAND123!",
        "email": "admin@example.com",
        "role": "admin",
        "gender": "Male",
        "status": "active",
        "created_at": Date.now()
    },
    {
        "username": "user1",
        "password": "user123!",
        "email": "user1@example.com",
        "role": "user",
        "gender": "male",
        "volume": 42,
        "scoreboard": "A",
        "status": "active",
        "created_at": Date.now(),
        "updated_at": null,
        "deleted_at": null
    }
]);
