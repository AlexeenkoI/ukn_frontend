import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd';

const menuMap = {
    "/users" : "Сотрудники",
    "/users/edit" : "Редактировать сотрудника",
    "/users/create" : "Создать нового сотрудника",
    "/customers" : "Клиенты",
    "/customers/edit" : "Редактировать клиента",
    "/customers/createcustomer" : "Добавить клиента",
    "/contracts" : "Заявления",
    "/contracts/edit" : "Редактировать заявку",
    "/contracts/create" : "Создать заявку",
    "/settings" : "Настройки",
    "/settings/work_types" : "Виды работ",
    "/settings/user_roles" : "Виды ролей",
    "/settings/status_types" : "Статусы заявлений",
}


/**
 * Хлебные крошки приложения
 * @param props - location props from react-router
 */
const TopCrumbs = withRouter((props) => {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      let url = '';
      if(index < 2){
        url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {menuMap[url]}
            </Link>
          </Breadcrumb.Item>
        );
      }
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="/">
        <Link to="/">Главная</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return(
        <Breadcrumb separator={<Icon type="right" theme="outlined" />}>
            {breadcrumbItems}
        </Breadcrumb>
    )
})

export default TopCrumbs;
