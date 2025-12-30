import './Card.css'

function Card({ 
  children, 
  className = '',
  hoverable = false,
  ...props 
}) {
  return (
    <div 
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card






