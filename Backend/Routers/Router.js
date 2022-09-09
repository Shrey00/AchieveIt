import express from 'express';
import { doneTodoFromDoing, doneTodoFromTodo, getGoals, moveToTodo, postTodo, removeDone, removeTodo, transferDoneToDoing, transferTodoToDoing, userData } from '../Controllers/UserData.js';
import {signUp,signin,getMe} from '../Controllers/User.js';
import authenticate from '../middlewares/authenticate.js';
import path from 'path';
import {fileURLToPath} from 'url';
const router = express.Router();
router.use(express.urlencoded({extended:true}));
// router.get('/', (req,res)=>{
//     res.send();
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.use(express.static(path.join(__dirname, '../../build')))
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build'));
})

router.post('/signup', signUp);
router.post('/signin', signin);
router.get('/me',authenticate,getMe);
// router.get('/goals',authenticate,getGoals);
// router.get('/todo',authenticate,userData); 
router.post('/addTodo',authenticate,postTodo);
router.post('/transferTodoToDoing',authenticate,transferTodoToDoing)
router.post('/doneTodoFromDoing',authenticate,doneTodoFromDoing)
router.post('/doneTodoFromTodo',authenticate,doneTodoFromTodo);
router.post('/transferDoneToDoing',authenticate,transferDoneToDoing);
router.post('/removeTodo',authenticate,removeTodo);
router.post('/removeDone',authenticate, removeDone);

router.post('/moveToTodo',authenticate, moveToTodo)
router.post('/transferDoneToDoing',authenticate,transferDoneToDoing);
router.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });
// router.get('/account');

export default router;