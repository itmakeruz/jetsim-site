import '../styles/main.css'

interface BenefitProps {
    benefit1: string
    benefit2: string
    benefit3: string
    benefit4: string
}

export default function BenefitCard({ benefit1, benefit2, benefit3, benefit4 }: BenefitProps) {
    return (
        <div className='benefit-card'>
            <p className='benefit-text'>{benefit1}</p>
            <p className='benefit-text'>{benefit2}</p>
            <p className='benefit-text'>{benefit3}</p>
            <p className='benefit-text'>{benefit4}</p>
        </div>
    )
}