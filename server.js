const express = require('express');
const cors = require('cors');
const multer = require('multer');


const app = express();

app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const userFilesRoutes = require('./api/userFiles/userFiles.routes');

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/userFiles', userFilesRoutes); // userFiles or userfiles?




app.get('/', (req, res) => {
    res.send('Hello World!');
});


const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});