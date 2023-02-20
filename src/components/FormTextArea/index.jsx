import cn from 'classnames';
import './styles.css'

const FormTextArea = ({ errorText, className, ...restProps}) => (
  <div className={cn("cnInputRoot", className)}>
  <textarea {...restProps} className={cn('cnFormTextAreaRoot', errorText && 'cnFormTextAreaWithError')}/>
  <span className="cnInputError">{errorText}</span>
  </div>
  )

export default FormTextArea;