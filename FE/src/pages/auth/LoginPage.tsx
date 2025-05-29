import { TextField, Checkbox, Button, InputAdornment } from '@mui/material';
import { Google as GoogleIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import CoverImage from '../../assets/Rectangle 80.png';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../../components/ui/GoogleLoginButton';
const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            NAD <span role="img" aria-label="book">📚</span>
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Welcome <span className="text-blue-600">back!</span>
          </h2>
          <p className="text-gray-600 mb-8 text-center text-sm">
            Discover manga, manhua and manhwa, track your progress, have fun, read manga.
          </p>

          <form>
            <div className="mb-4">
              <TextField
                label="SDT"
                type="email"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="!bg-white !rounded-lg"
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="!bg-white !rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between mb-4 text-sm">
              <label className="flex items-center text-gray-700">
                <Checkbox size="small" />
                <span className="ml-1">Remember me</span>
              </label>
              <Link to="#" className="text-blue-600 hover:underline">
                Recovery password
              </Link>
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="!mb-4 !rounded-lg !normal-case !font-semibold"
              style={{ boxShadow: '0 0 0 2px #e0e0e0' }}
            >
              Log in
            </Button>

            <GoogleLoginButton />

            <div className="text-center text-sm text-gray-700">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
              <p>
                Go back to{' '}
                <Link to="/" className="text-blue-600 hover:underline">
                  home page
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${CoverImage})` }}
      ></div>
    </div>
  );
};

export default LoginPage;
