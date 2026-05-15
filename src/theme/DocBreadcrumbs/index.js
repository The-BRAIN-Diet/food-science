import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc, useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
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

const BRS6_PARENT_FM_BREADCRUMBS = {
  'BRS6(FM1)': {
    label: 'Glycaemic–Insulin Stability & Cognitive Energy Availability',
    path: '/docs/biological-targets/brs6/fm/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability',
  },
  'BRS6(FM2)': {
    label: 'HPA Axis Rhythm & Cortisol Regulation',
    path: '/docs/biological-targets/brs6/fm/brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation',
  },
  'BRS6(FM3)': {
    label: 'Autonomic Balance & Vagal Recovery Capacity',
    path: '/docs/biological-targets/brs6/fm/brs6-fm3-autonomic-balance-and-vagal-recovery-capacity',
  },
  'BRS6(FM4)': {
    label: 'Stress-Inflammation / Metabolic Load Allocation',
    path: '/docs/biological-targets/brs6/fm/brs6-fm4-stress-inflammation-metabolic-load-allocation',
  },
};

function addParentFmBreadcrumb({breadcrumbs, frontMatter, location, parentFmUrls}) {
  const parentFmId = frontMatter?.parent_fm;
  const parentFm = parentFmId ? BRS6_PARENT_FM_BREADCRUMBS[parentFmId] : undefined;
  const isBrs6PmPage = location.pathname.includes('/docs/biological-targets/brs6/pm/');

  if (!isBrs6PmPage || !parentFm) {
    return breadcrumbs;
  }

  const alreadyIncludesParentFm = breadcrumbs.some(
    (item) => item.href === parentFmUrls[parentFmId],
  );
  if (alreadyIncludesParentFm) {
    return breadcrumbs;
  }

  const primaryMechanismsIndex = breadcrumbs.findIndex(
    (item) => item.label === 'Primary Mechanisms',
  );
  if (primaryMechanismsIndex === -1) {
    return breadcrumbs;
  }

  const parentFmBreadcrumb = {
    type: 'category',
    label: parentFm.label,
    href: parentFmUrls[parentFmId],
  };

  return [
    ...breadcrumbs.slice(0, primaryMechanismsIndex),
    parentFmBreadcrumb,
    ...breadcrumbs.slice(primaryMechanismsIndex + 1),
  ];
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const {frontMatter} = useDoc();
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
  const parentFmUrls = {
    'BRS6(FM1)': useBaseUrl(BRS6_PARENT_FM_BREADCRUMBS['BRS6(FM1)'].path),
    'BRS6(FM2)': useBaseUrl(BRS6_PARENT_FM_BREADCRUMBS['BRS6(FM2)'].path),
    'BRS6(FM3)': useBaseUrl(BRS6_PARENT_FM_BREADCRUMBS['BRS6(FM3)'].path),
    'BRS6(FM4)': useBaseUrl(BRS6_PARENT_FM_BREADCRUMBS['BRS6(FM4)'].path),
  };

  if (!breadcrumbs) {
    return null;
  }
  const displayBreadcrumbs = addParentFmBreadcrumb({
    breadcrumbs,
    frontMatter,
    location,
    parentFmUrls,
  });

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={displayBreadcrumbs} />
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
          {displayBreadcrumbs.map((item, idx) => {
            const isLast = idx === displayBreadcrumbs.length - 1;
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
