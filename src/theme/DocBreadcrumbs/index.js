import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import styles from './styles.module.css';
// TODO move to design system folder
function BreadcrumbsItemLink({children, href, isLast}) {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
// TODO move to design system folder
function BreadcrumbsItem({children, active}) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}
const RECIPES_INDEX_PATH = '/docs/recipes';

// Map recipe category labels to their index paths (for breadcrumb links when sidebar omits href)
const RECIPE_CATEGORY_PATHS = {
  Recipes: RECIPES_INDEX_PATH,
  Breakfast: `${RECIPES_INDEX_PATH}/Breakfast`,
  Lunch: `${RECIPES_INDEX_PATH}/Lunch`,
  Dinner: `${RECIPES_INDEX_PATH}/Dinner`,
  Drinks: `${RECIPES_INDEX_PATH}/Drinks`,
};

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const location = useLocation();
  const isInRecipesSection = location.pathname.includes(RECIPES_INDEX_PATH);
  const recipeCategoryUrls = {
    Recipes: useBaseUrl(RECIPES_INDEX_PATH),
    Breakfast: useBaseUrl(`${RECIPES_INDEX_PATH}/Breakfast`),
    Lunch: useBaseUrl(`${RECIPES_INDEX_PATH}/Lunch`),
    Dinner: useBaseUrl(`${RECIPES_INDEX_PATH}/Dinner`),
    Drinks: useBaseUrl(`${RECIPES_INDEX_PATH}/Drinks`),
  };

  if (!breadcrumbs) {
    return null;
  }
  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            let href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            // Ensure recipe category breadcrumbs are clickable when sidebar omits href (fixes mobile nav)
            if (!href && isInRecipesSection && recipeCategoryUrls[item.label]) {
              href = recipeCategoryUrls[item.label];
            }
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
