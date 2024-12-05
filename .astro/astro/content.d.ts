declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"company": {
"bola-ai.md": {
	id: "bola-ai.md";
  slug: "bola-ai";
  body: string;
  collection: "company";
  data: any
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: any
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: any
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: any
} & { render(): Render[".md"] };
};
"integrations": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "integrations";
  data: any
} & { render(): Render[".md"] };
};
"jobs": {
"bol-saas-bdr-id-bf0938.md": {
	id: "bol-saas-bdr-id-bf0938.md";
  slug: "bol-saas-bdr-id-bf0938";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bola-jr-software-engineer-id-bf8921.md": {
	id: "bola-jr-software-engineer-id-bf8921.md";
  slug: "bola-jr-software-engineer-id-bf8921";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bola-lead-software-engineer-id-bf9821.md": {
	id: "bola-lead-software-engineer-id-bf9821.md";
  slug: "bola-lead-software-engineer-id-bf9821";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bola-saas-ae-id-bf-3293.md": {
	id: "bola-saas-ae-id-bf-3293.md";
  slug: "bola-saas-ae-id-bf-3293";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bola-software-engineer-id-bd9423.md": {
	id: "bola-software-engineer-id-bd9423.md";
  slug: "bola-software-engineer-id-bd9423";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"bols-vp-software-engineering-id-bf4328.md": {
	id: "bols-vp-software-engineering-id-bf4328.md";
  slug: "bols-vp-software-engineering-id-bf4328";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-ae-finance-idbd8942.md": {
	id: "tr-ae-finance-idbd8942.md";
  slug: "tr-ae-finance-idbd8942";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-contract-admin-id-mf8590.md": {
	id: "tr-contract-admin-id-mf8590.md";
  slug: "tr-contract-admin-id-mf8590";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-cypress-account-executive-idbf8931.md": {
	id: "tr-cypress-account-executive-idbf8931.md";
  slug: "tr-cypress-account-executive-idbf8931";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-doc-specialist-id-bf8402.md": {
	id: "tr-doc-specialist-id-bf8402.md";
  slug: "tr-doc-specialist-id-bf8402";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-efae-idhr8933.md": {
	id: "tr-efae-idhr8933.md";
  slug: "tr-efae-idhr8933";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-fort-worth-aeef-idbf74881.md": {
	id: "tr-fort-worth-aeef-idbf74881.md";
  slug: "tr-fort-worth-aeef-idbf74881";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-houston-aeef-idyt7477.md": {
	id: "tr-houston-aeef-idyt7477.md";
  slug: "tr-houston-aeef-idyt7477";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-ibanking-idtu4892.md": {
	id: "tr-ibanking-idtu4892.md";
  slug: "tr-ibanking-idtu4892";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
"tr-vp-ibank-idny8492.md": {
	id: "tr-vp-ibank-idny8492.md";
  slug: "tr-vp-ibank-idny8492";
  body: string;
  collection: "jobs";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"10-high-paying-sales-jobs-you-can-get-without-a-degree.md": {
	id: "10-high-paying-sales-jobs-you-can-get-without-a-degree.md";
  slug: "10-high-paying-sales-jobs-you-can-get-without-a-degree";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"common-employee-benefits-in-orange-county-ca-private-sector.md": {
	id: "common-employee-benefits-in-orange-county-ca-private-sector.md";
  slug: "common-employee-benefits-in-orange-county-ca-private-sector";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-implement-structured-json-ld-for-google-jobs.md": {
	id: "how-to-implement-structured-json-ld-for-google-jobs.md";
  slug: "how-to-implement-structured-json-ld-for-google-jobs";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"software-engineer-careers-orange-county.md": {
	id: "software-engineer-careers-orange-county.md";
  slug: "software-engineer-careers-orange-county";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"software-engineer-internships-orange-county.md": {
	id: "software-engineer-internships-orange-county.md";
  slug: "software-engineer-internships-orange-county";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"software-engineer-jobs-orange-county.md": {
	id: "software-engineer-jobs-orange-county.md";
  slug: "software-engineer-jobs-orange-county";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"software-engineer-salary-orange-county.md": {
	id: "software-engineer-salary-orange-county.md";
  slug: "software-engineer-salary-orange-county";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"software-engineering-positions-orange-county.md": {
	id: "software-engineering-positions-orange-county.md";
  slug: "software-engineering-positions-orange-county";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"when-to-follow-up-with-a-recruiter.md": {
	id: "when-to-follow-up-with-a-recruiter.md";
  slug: "when-to-follow-up-with-a-recruiter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
