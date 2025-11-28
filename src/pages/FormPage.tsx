import Form from '../components/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="text-center pt-16 pb-8 px-4">
                    <div className="inline-block mb-4">
                        <span className="bg-linear-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                            Career Opportunity
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Start Your Journey
                        <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                            With Us Today
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We're looking for talented individuals to join our growing team.
                        Fill out the application form below and take the first step towards an exciting career.
                    </p>
                </div>

                {/* Form Component */}
                <Form />

                {/* Footer */}
                <footer className="text-center py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="border-t border-gray-700 pt-8">

                            <p className="text-gray-500 text-xs">
                                © 2025 Hustlify. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Toast Container */}
            <ToastContainer />

            {/* Custom Animations */}
            <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}

export default FormPage;