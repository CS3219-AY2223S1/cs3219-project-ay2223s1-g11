import express from 'express';
import cors from 'cors';
import {changePassword, createUser, loginUser, logoutUser, validateUserToken, deleteUser} from './controller/user-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

// Controller will contain all the User-defined Routes
app.get('/', (req, res) => res.send("Hello World from user-service"))
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)
router.post('/login', loginUser)
router.post('/token', validateUserToken)
router.post('/logout', logoutUser)
router.post('/change', changePassword)
router.post('/delete', deleteUser)


app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

var port = process.env.PORT || 8000;

app.listen(port, () => console.log(`user-service listening on port ${port}`));

export default app;