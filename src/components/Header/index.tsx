import { connect } from 'react-redux';
import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { Projects } from 'API';
import { navigateToProject, navigateToHome } from 'actions';
import { getSelectedObject } from 'selectors';

import * as s from './style.css';
/*
  TODO: Please, do not forget that path can be:
  - Home
  - Home / Project name
  - Home / Project name / File name
  or
  - Home / User name
*/

type Props = {
  currentObject: any,
  navigateToProject: (number) => any,
  navigateToHome: () => any
}

export const Header: React.SFC<Props> = (props) => {
  const renderLevels = () => {
    if (!props.currentObject) {
      return null;
    }
    if (props.currentObject.type === 'user') {
      return (
        <div className={s.level_wrapper}>
          <span className={s.separator}>/</span>
          <a className={s.link} href="#">{props.currentObject.name}</a>
        </div>
      );
    } else {
      if (props.currentObject.type === 'file') {
        return (
          <div className={s.level_wrapper}>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#" onClick={() => props.navigateToProject(props.currentObject.project.id)}>{props.currentObject.project.title}</a>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#">{props.currentObject.name}</a>
          </div>
        )
      } else {
        //Project
        return (
          <div className={s.level_wrapper}>
            <span className={s.separator}>/</span>
            <a className={s.link} href="#">{props.currentObject.title}</a>
          </div>
        )

      }
    }
  }

  const renderSelectedItem = () => {
    if (!props.currentObject) {
      return (
        <div>
          <ul>
            {Projects.map((project) =>
              <li key={project.id}><a className={s.link} href="#" onClick={() => props.navigateToProject(project.id)}>{project.title}</a></li>
            )}
          </ul>
        </div>
      )
    }
    if (props.currentObject.type === 'user') {
      return (<h1 className={s.projectname}>{props.currentObject.name}</h1>);
    }
    //File
    return (<h1 className={s.projectname}>{props.currentObject.name}</h1>);
  }

  return (
    <header className={s.header}>
      <SearchBox />
      <div className={s.breadcrumbs}>
        <a className={s.link} href="#" onClick={() => props.navigateToHome()}>All projects</a>
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