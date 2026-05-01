import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="
                flex items-center gap-2
                px-4 py-2
                rounded-[10px]
                bg-[#1E3A8A]
                text-white
                shadow-sm
                hover:bg-[#102467]
                hover:shadow-md
                transition-all duration-200
                group
                "
            >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
        </button>
    )
}

export default BackButton