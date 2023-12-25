import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function OAuth() {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        console.log("google button is clicked only")
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await axios.post('https://backend-musicmix-production.up.railway.app/users/google', {
                email: result.user.email,
                username: result.user.displayName,
            }); 
            localStorage.setItem("musicmixtoken", res.data.token);        
            navigate("/home");
        } catch (error) {
            console.log('Could not login with Google', error);
        }
    };

    return (
        <button type='button' onClick={handleGoogleClick} className="w-full text-white bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-900">
            Continue with Google
        </button>
    );
}