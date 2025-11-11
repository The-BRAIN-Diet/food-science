import sidebars from '../../sidebars';

// Helper function to convert sidebar items to footer links
function sidebarToFooterLinks() {
    const footerLinks: Array<{
        title: string;
        items: Array<{ label: string; to: string }>;
    }> = [];

    const sidebar = sidebars.defaultSidebar;

    sidebar.forEach((item) => {
        if (item.type === 'category') {
            const categoryItems: Array<{ label: string; to: string }> = [];

            // Add overview/index link
            const indexItem = item.items.find((i) =>
                typeof i === 'string' && i.includes('index')
            );
            if (indexItem && typeof indexItem === 'string') {
                categoryItems.push({
                    label: 'Overview',
                    to: `/docs/${indexItem}`,
                });
            }

            // Add other items
            item.items.forEach((sidebarItem) => {
                if (typeof sidebarItem === 'string' && !sidebarItem.includes('index')) {
                    // Extract the last part as the label
                    const parts = sidebarItem.split('/');
                    const label = parts[parts.length - 1]
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                    categoryItems.push({
                        label,
                        to: `/docs/${sidebarItem}`,
                    });
                }
            });

            if (categoryItems.length > 0) {
                footerLinks.push({
                    title: item.label,
                    items: categoryItems,
                });
            }
        }
    });

    return footerLinks;
}

export const dynamicFooterLinks = sidebarToFooterLinks();

// Static links that aren't in sidebars
export const staticFooterLinks = [
    {
        title: 'Resources',
        items: [
            {
                label: 'Recipes',
                to: '/docs/recipes',
            },
            {
                label: 'Substances',
                to: '/docs/substances',
            },
            {
                label: 'Papers',
                to: '/docs/papers',
            },
            {
                label: 'Training',
                to: '/docs/training',
            },
            {
                label: 'Partners',
                to: '/docs/partners',
            },
        ],
    },
];
