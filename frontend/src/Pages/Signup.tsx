
import Quote from '../Components/Quote'
import SignupForm from '../Components/signupform'

const Signup = () => {
  return (
    
    <div className='lg:grid grid-cols-2'>
      <div className='h-screen flex items-center justify-center'>
      <SignupForm type='signup'  />
      </div>
      <div className='hidden lg:block'>
      <Quote  />
      </div>
    </div>
  )
}

export default Signup