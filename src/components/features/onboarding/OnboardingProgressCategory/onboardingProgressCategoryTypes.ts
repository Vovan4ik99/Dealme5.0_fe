export type CategoryStatus = 'completed' | 'active' | 'upcoming';

interface ICategoryBase {
	kind: 'category' | 'subcategory';
	status: CategoryStatus;
	subcategoriesCount?: number;
	title: string;
}

interface ICategory extends ICategoryBase {
	kind: 'category';
	subcategoriesCount: number;
}

interface ISubcategory extends ICategoryBase {
	kind: 'subcategory';
	subcategoriesCount?: never;
}

export type OnboardingProgressCategoryProps = ICategory | ISubcategory;