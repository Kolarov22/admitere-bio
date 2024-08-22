import React from 'react'
import { TriangleAlertIcon } from 'lucide-react'

interface FormErrorProps {
    message?: string
}


const FormError = ({message} : FormErrorProps) => {

    if (!message) {
        return null
    }

  return (
    <div className="flex items-center space-x-2 text-red-500">
            <TriangleAlertIcon size={24} />
            <span className="font-bold">{message}</span>
    </div>
  )
}

export default FormError