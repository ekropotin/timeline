import { connect } from 'react-redux';
import * as React from 'react';
import * as s from './style.css';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { Projects } from 'API';
import { navigateToProject, navigateToHome, navigateToFile, navigateToUser } from 'actions';
import { getSelectedObject } from 'selectors';
/*
  TODO: Please, do not forget that path can be:
  - Home
  - Home / Project name
  - Home / Project name / File name
  or
  - Home / User name
*/

//TODO: use React.SFC<Props>
export const Header = ({ currentObject, navigateToProject, navigateToHome }) => {
  const renderLevels = () => {
    if (!currentObject) {
      return null;
    }
    if (currentObject.type === 'user') {
      return (
        <div className={s.level_wrapper}>
          <span className={s.separator}>/</span>
          <a className={s.link} href="#">{currentObject.name}</a>
        </div>
      );
    } else {
      if (currentObject.type === 'file') {
        return (
          <div className={s.level_wrapper}>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#" onClick={() => navigateToProject(currentObject.project.id)}>{currentObject.project.title}</a>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#">{currentObject.name}</a>
          </div>
        )
      } else {
        //Project
        return(
          <div className={s.level_wrapper}>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#">{currentObject.title}</a>
          </div>
        )
        
      }
    }
  }

  const renderSelectedItem = () => {
    if (!currentObject) {
      return(
        <div>
          <ul>
            {Projects.map((project) => 
              <li key={project.id}><a className={s.link} href="#" onClick={() => navigateToProject(project.id)}>{project.title}</a></li>
            )}
          </ul>
        </div>
      )
    }
    if (currentObject.type === 'user') {
      //TODO: avatar?
      return (<h1 className={s.projectname}>{currentObject.name}</h1>);
    }
    //File
    return (<h1 className={s.projectname}>{currentObject.name}</h1>);
  }

  return (
    <header className={s.header}>
      <SearchBox />
      <div className={s.breadcrumbs}>
        <a className={s.link} href="#" onClick={() => navigateToHome()}>All projects</a>
        {renderLevels()}
      </div>
      {renderSelectedItem()}
    </header>
  );
}

const mapDispatchToProps = {
  navigateToProject,
  navigateToHome
};

const mapStateToProps = (state) => ({
  currentObject: getSelectedObject(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);