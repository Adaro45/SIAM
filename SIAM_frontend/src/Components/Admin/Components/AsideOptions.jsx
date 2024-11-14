import React from 'react'
import { Link } from 'react-router-dom';
const AsideOptions = () => {
  return (
    <div className='admin_aside_options'>
      <h2 className="admin_aside_title">Opciones</h2>
      <ul className="aside_options_list">
        <li className="aside_options_item"><Link to="usermanagment">UserManagment</Link></li>
        <li className="aside_options_item"><Link to="projectmanagment">ProjectManagment</Link></li>
        <li className="aside_options_item"><Link to="misc">Misc</Link></li>
      </ul>
    </div>
  )
};
export default AsideOptions;