const EmploymentType = props => {
  const {details, onclickCheckbox} = props
  const {employmentTypeId, label} = details
  const onChangecheckbox = event => {
    onclickCheckbox(employmentTypeId, event.target.checked)
  }
  return (
    <li className="checkbox">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onChange={onChangecheckbox}
      />
      <label htmlFor={employmentTypeId}> {label}</label>
    </li>
  )
}

export default EmploymentType
