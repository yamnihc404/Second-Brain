import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, ContentModel, LinkModel } from './db';
import {z} from 'zod';
import bcrypt from  'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import {Random} from './utils';
import cors from "cors"



const PORT = 3000;
const SECRET_KEY = 'chinmay123';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



const signupschema = z.object({
    username: z.string().max(10,'UserName should not be too long'),
    password: z.string().min(8,'Password should contain atleast 8 characters').refine((val)=>/[!@#$%^&*(){}+-.<>]/.test(val),'Password should contain atleast one special character').refine((val)=>/[A-Z]/.test(val), 'Password should contain at least one Uppercase Character.'),
})
interface DecodedToken extends JwtPayload {
    id: string;
}
interface AuthenticatedRequest extends Request {
    body : {
        headers ?: any;
        id?: string; 
    };
}


const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "No token provided" }); 
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as unknown as DecodedToken;

        if (!decoded.id) {
            return res.status(400).json({ message: "Invalid Token Payload" });
        }

        req.body.id = decoded.id;  
        next();  
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });  
    }
};

app.post('/api/brain/signup', async (req, res) => {

  try{
  const validatedData = signupschema.parse(req.body);
  const hashedpassword = await bcrypt.hash(validatedData.password, 10);
  console.log(validatedData.username, validatedData.password)
  await UserModel.create(
    {
        username : validatedData.username,
        password : hashedpassword
    }
   );
   res.status(200).json(
    {
        message: 'Successfully Signed up'
    }
)
}
catch(error){
    if (error instanceof z.ZodError) {
        console.log(error)
        const errorMessages = error.errors.map(err => err.message);
        res.status(400).json({
            messages: errorMessages,
        });
    }
    else{
        res.status(400).json(
            {
                message: 'UserName already Exist.'
            }
        )
    }
}
}) 

app.post('/api/brain/signin', async (req, res) => {

    const {username : username, password : password} = req.body;
    const User = await UserModel.findOne({username: username});

    if(!User){
        res.status(400).json({
            message : 'Invalid Username' 
        })
    return;
    }

    const reponse = await bcrypt.compare(password, User.password);


    if(!reponse){
        res.status(400).json({
            message : 'Invalid Password' 
        })
    return;
    }


   const token = jwt.sign({id: User._id.toString()}, SECRET_KEY);
     res.status(200).json({
         token : token
     })


})


//@ts-ignore
app.get('/api/brain/content', auth ,async (req, res) => {
  const userID = req.body.id;

  const Content = await ContentModel.find({
    userID: userID
  })

   

  if(!Content){
    res.json({message : "User not found"})
  }
   
  console.log(Content);
  res.status(200).json({
    Content
  })

})

//@ts-ignore
app.post('/api/brain/content', auth, async (req, res) => {
try{
  //@ts-ignore
  const {title: title, link : link, id : userID, type: type} = req.body;

  const exist = await UserModel.findOne({
    _id: userID
  });
  
  if(!exist) {
    return res.status(404).json({message : "User not found"});
  }

   
  await ContentModel.create({
    title: title,
    link: link,
    userID: userID,
    type : type
  });
   
  res.status(200).json({
    message: 'Content Added successfully'
    
  })
}
catch(error){
    res.status(400).json({
        message : (error as any).message
    })
}
})

//@ts-ignore
app.delete('/api/brain/content',auth, async (req, res) =>{
     
    //@ts-ignore
    const contentId = req.body.contentId;

    await ContentModel.findOneAndDelete({
        _id : contentId,
        userID :  req.body.id
    }).then(() => res.status(200).json({message : 'Content deleted successfully'}))

})

//@ts-ignore
app.post('/api/brain/share',auth,async (req, res) => {
    try{
    const userID = req.body.id;
    const existing = await LinkModel.findOne({userID});
    if(existing){
        res.status(200).json({
         message : `${existing.link}`
        })
    }
    else{
        const response = await LinkModel.create({
            link : Random(7),
            userID
        });
        console.log(response.link)
        res.status(200).json({
            message : `${response.link}`
        });
    }
   
    }catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message
            });
        } else {
            res.status(500).json({
                message: 'An unknown error occurred'
            });
        }
    }
})


//@ts-ignore
app.get('/api/brain/:shareLink', async (req, res) => {
    const link = req.params.shareLink;
    const existLink = await LinkModel.findOne({link});
    if(!existLink){

      return res.status(404).json({
        message : 'Bad request'
    })
    }
    const userID = existLink.userID;
    const user = await ContentModel.find({userID}).populate("userID", 'username');
    res.status(200).json({
        user
    });
});


app.listen(PORT, ()=>{console.log(`Server is live at ${PORT}`)})
