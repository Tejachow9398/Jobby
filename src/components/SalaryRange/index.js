const SalaryRange = props => {
  const {details, onChangesalary} = props
  const {salaryRangeId, label} = details
  const onClickSalray = () => {
    onChangesalary(salaryRangeId)
  }
  return (
    <li className="checkbox">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        value={salaryRangeId}
        onChange={onClickSalray}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
