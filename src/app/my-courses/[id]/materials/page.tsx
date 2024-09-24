import React from 'react'
import PdfPreview from '@/components/PdfPreview'

const CourseMaterials = () => {
  return (
    <div className='flex justify-center items-center'>
      <PdfPreview pdfUrl='/sdm1.pdf'/>
    </div>
  )
}

export default CourseMaterials