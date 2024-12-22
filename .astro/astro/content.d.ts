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
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
};
"customers": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "customers";
  data: InferEntrySchema<"customers">
} & { render(): Render[".md"] };
};
"helpcenter": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "helpcenter";
  data: InferEntrySchema<"helpcenter">
} & { render(): Render[".md"] };
};
"infopages": {
"bug-bounty.md": {
	id: "bug-bounty.md";
  slug: "bug-bounty";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"dpa.md": {
	id: "dpa.md";
  slug: "dpa";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"privacy.md": {
	id: "privacy.md";
  slug: "privacy";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
"terms.md": {
	id: "terms.md";
  slug: "terms";
  body: string;
  collection: "infopages";
  data: InferEntrySchema<"infopages">
} & { render(): Render[".md"] };
};
"integrations": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "integrations";
  data: InferEntrySchema<"integrations">
} & { render(): Render[".md"] };
};
"jobs": {
"bol-saas-bdr-id-bf0938.md": {
	id: "bol-saas-bdr-id-bf0938.md";
  slug: "bol-saas-bdr-id-bf0938";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"bola-jr-software-engineer-id-bf8921.md": {
	id: "bola-jr-software-engineer-id-bf8921.md";
  slug: "bola-jr-software-engineer-id-bf8921";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"bola-lead-software-engineer-id-bf9821.md": {
	id: "bola-lead-software-engineer-id-bf9821.md";
  slug: "bola-lead-software-engineer-id-bf9821";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"bola-saas-ae-id-bf-3293.md": {
	id: "bola-saas-ae-id-bf-3293.md";
  slug: "bola-saas-ae-id-bf-3293";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"bola-software-engineer-id-bd9423.md": {
	id: "bola-software-engineer-id-bd9423.md";
  slug: "bola-software-engineer-id-bd9423";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"bols-vp-software-engineering-id-bf4328.md": {
	id: "bols-vp-software-engineering-id-bf4328.md";
  slug: "bols-vp-software-engineering-id-bf4328";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-account-executive-houston-acco-vv1mj7.md": {
	id: "tr-account-executive-houston-acco-vv1mj7.md";
  slug: "tr-account-executive-houston-acco-vv1mj7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ae-finance-idbd8942.md": {
	id: "tr-ae-finance-idbd8942.md";
  slug: "tr-ae-finance-idbd8942";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ai-product-manager-long-beach-ai-p-2ta7dg.md": {
	id: "tr-ai-product-manager-long-beach-ai-p-2ta7dg.md";
  slug: "tr-ai-product-manager-long-beach-ai-p-2ta7dg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ai-product-manager-oceanside-ai-p-h4drdh.md": {
	id: "tr-ai-product-manager-oceanside-ai-p-h4drdh.md";
  slug: "tr-ai-product-manager-oceanside-ai-p-h4drdh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ai-product-manager-san-diego-ai-p-qo41be.md": {
	id: "tr-ai-product-manager-san-diego-ai-p-qo41be.md";
  slug: "tr-ai-product-manager-san-diego-ai-p-qo41be";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ai-product-manager-santa-ana-ai-p-auwn12.md": {
	id: "tr-ai-product-manager-santa-ana-ai-p-auwn12.md";
  slug: "tr-ai-product-manager-santa-ana-ai-p-auwn12";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-auburn-bdr--ucdv90.md": {
	id: "tr-bdr---tech-sales-auburn-bdr--ucdv90.md";
  slug: "tr-bdr---tech-sales-auburn-bdr--ucdv90";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-fresno-bdr--ai0vqp.md": {
	id: "tr-bdr---tech-sales-fresno-bdr--ai0vqp.md";
  slug: "tr-bdr---tech-sales-fresno-bdr--ai0vqp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-long-beach-bdr--hfz8u1.md": {
	id: "tr-bdr---tech-sales-long-beach-bdr--hfz8u1.md";
  slug: "tr-bdr---tech-sales-long-beach-bdr--hfz8u1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-long-beach-bdr--udoveb.md": {
	id: "tr-bdr---tech-sales-long-beach-bdr--udoveb.md";
  slug: "tr-bdr---tech-sales-long-beach-bdr--udoveb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-portland-bdr--cxb7wp.md": {
	id: "tr-bdr---tech-sales-portland-bdr--cxb7wp.md";
  slug: "tr-bdr---tech-sales-portland-bdr--cxb7wp";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-san-bernardino-bdr--1wv35o.md": {
	id: "tr-bdr---tech-sales-san-bernardino-bdr--1wv35o.md";
  slug: "tr-bdr---tech-sales-san-bernardino-bdr--1wv35o";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-san-francisco-bdr--3qz7k7.md": {
	id: "tr-bdr---tech-sales-san-francisco-bdr--3qz7k7.md";
  slug: "tr-bdr---tech-sales-san-francisco-bdr--3qz7k7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-san-jose-bdr--688epy.md": {
	id: "tr-bdr---tech-sales-san-jose-bdr--688epy.md";
  slug: "tr-bdr---tech-sales-san-jose-bdr--688epy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-santa-ana-bdr--bn50zm.md": {
	id: "tr-bdr---tech-sales-santa-ana-bdr--bn50zm.md";
  slug: "tr-bdr---tech-sales-santa-ana-bdr--bn50zm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-bdr---tech-sales-santa-clarita-bdr--2hp53a.md": {
	id: "tr-bdr---tech-sales-santa-clarita-bdr--2hp53a.md";
  slug: "tr-bdr---tech-sales-santa-clarita-bdr--2hp53a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-business-development-representative-austin-busi-1fefd3.md": {
	id: "tr-business-development-representative-austin-busi-1fefd3.md";
  slug: "tr-business-development-representative-austin-busi-1fefd3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-business-development-representative-dallas-busi-lj27vg.md": {
	id: "tr-business-development-representative-dallas-busi-lj27vg.md";
  slug: "tr-business-development-representative-dallas-busi-lj27vg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-business-development-representative-san-antonio-busi-jeo7dy.md": {
	id: "tr-business-development-representative-san-antonio-busi-jeo7dy.md";
  slug: "tr-business-development-representative-san-antonio-busi-jeo7dy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-buena-park-chan-rw864f.md": {
	id: "tr-channel-partner-manager-buena-park-chan-rw864f.md";
  slug: "tr-channel-partner-manager-buena-park-chan-rw864f";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-costa-mesa-chan-wusr37.md": {
	id: "tr-channel-partner-manager-costa-mesa-chan-wusr37.md";
  slug: "tr-channel-partner-manager-costa-mesa-chan-wusr37";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-el-monte-chan-xgiryx.md": {
	id: "tr-channel-partner-manager-el-monte-chan-xgiryx.md";
  slug: "tr-channel-partner-manager-el-monte-chan-xgiryx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-huntington-beach-chan-saykhf.md": {
	id: "tr-channel-partner-manager-huntington-beach-chan-saykhf.md";
  slug: "tr-channel-partner-manager-huntington-beach-chan-saykhf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-santa-clarita-chan-5sltwg.md": {
	id: "tr-channel-partner-manager-santa-clarita-chan-5sltwg.md";
  slug: "tr-channel-partner-manager-santa-clarita-chan-5sltwg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-channel-partner-manager-santa-monica-chan-uepxe7.md": {
	id: "tr-channel-partner-manager-santa-monica-chan-uepxe7.md";
  slug: "tr-channel-partner-manager-santa-monica-chan-uepxe7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-computer-vision-engineer-garden-grove-comp-svehku.md": {
	id: "tr-computer-vision-engineer-garden-grove-comp-svehku.md";
  slug: "tr-computer-vision-engineer-garden-grove-comp-svehku";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-computer-vision-engineer-hawthorne-comp-isevxa.md": {
	id: "tr-computer-vision-engineer-hawthorne-comp-isevxa.md";
  slug: "tr-computer-vision-engineer-hawthorne-comp-isevxa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-computer-vision-engineer-inglewood-comp-jiessn.md": {
	id: "tr-computer-vision-engineer-inglewood-comp-jiessn.md";
  slug: "tr-computer-vision-engineer-inglewood-comp-jiessn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-computer-vision-engineer-pasadena-comp-5olgvu.md": {
	id: "tr-computer-vision-engineer-pasadena-comp-5olgvu.md";
  slug: "tr-computer-vision-engineer-pasadena-comp-5olgvu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-computer-vision-engineer-pomona-comp-f0qucf.md": {
	id: "tr-computer-vision-engineer-pomona-comp-f0qucf.md";
  slug: "tr-computer-vision-engineer-pomona-comp-f0qucf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-contract-admin-id-mf8590.md": {
	id: "tr-contract-admin-id-mf8590.md";
  slug: "tr-contract-admin-id-mf8590";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-cypress-account-executive-idbf8931.md": {
	id: "tr-cypress-account-executive-idbf8931.md";
  slug: "tr-cypress-account-executive-idbf8931";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-carson-devo-wajb04.md": {
	id: "tr-devops-engineer-carson-devo-wajb04.md";
  slug: "tr-devops-engineer-carson-devo-wajb04";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-fullerton-devo-lu3b6k.md": {
	id: "tr-devops-engineer-fullerton-devo-lu3b6k.md";
  slug: "tr-devops-engineer-fullerton-devo-lu3b6k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-mission-viejo-devo-wgtogl.md": {
	id: "tr-devops-engineer-mission-viejo-devo-wgtogl.md";
  slug: "tr-devops-engineer-mission-viejo-devo-wgtogl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-newport-beach-devo-8uiykn.md": {
	id: "tr-devops-engineer-newport-beach-devo-8uiykn.md";
  slug: "tr-devops-engineer-newport-beach-devo-8uiykn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-norwalk-devo-4j6z37.md": {
	id: "tr-devops-engineer-norwalk-devo-4j6z37.md";
  slug: "tr-devops-engineer-norwalk-devo-4j6z37";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-devops-engineer-orange-devo-8515rx.md": {
	id: "tr-devops-engineer-orange-devo-8515rx.md";
  slug: "tr-devops-engineer-orange-devo-8515rx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-doc-specialist-id-bf8402.md": {
	id: "tr-doc-specialist-id-bf8402.md";
  slug: "tr-doc-specialist-id-bf8402";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ef-funding-manager-idbg0882.md": {
	id: "tr-ef-funding-manager-idbg0882.md";
  slug: "tr-ef-funding-manager-idbg0882";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-efae-idhr8933.md": {
	id: "tr-efae-idhr8933.md";
  slug: "tr-efae-idhr8933";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-enterprise-account-executive-anaheim-ente-ebvt68.md": {
	id: "tr-enterprise-account-executive-anaheim-ente-ebvt68.md";
  slug: "tr-enterprise-account-executive-anaheim-ente-ebvt68";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-fort-worth-aeef-idbf74881.md": {
	id: "tr-fort-worth-aeef-idbf74881.md";
  slug: "tr-fort-worth-aeef-idbf74881";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-full-stack-developer-bellflower-full-o0v5sv.md": {
	id: "tr-full-stack-developer-bellflower-full-o0v5sv.md";
  slug: "tr-full-stack-developer-bellflower-full-o0v5sv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-full-stack-developer-burbank-full-dth9fa.md": {
	id: "tr-full-stack-developer-burbank-full-dth9fa.md";
  slug: "tr-full-stack-developer-burbank-full-dth9fa";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-full-stack-developer-chula-vista-full-eec20g.md": {
	id: "tr-full-stack-developer-chula-vista-full-eec20g.md";
  slug: "tr-full-stack-developer-chula-vista-full-eec20g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-full-stack-developer-downey-full-6ln2gd.md": {
	id: "tr-full-stack-developer-downey-full-6ln2gd.md";
  slug: "tr-full-stack-developer-downey-full-6ln2gd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-full-stack-developer-tustin-full-o0c3u5.md": {
	id: "tr-full-stack-developer-tustin-full-o0c3u5.md";
  slug: "tr-full-stack-developer-tustin-full-o0c3u5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-funding-paralegal-irvine-idbg0932.md": {
	id: "tr-funding-paralegal-irvine-idbg0932.md";
  slug: "tr-funding-paralegal-irvine-idbg0932";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-houston-aeef-idyt7477.md": {
	id: "tr-houston-aeef-idyt7477.md";
  slug: "tr-houston-aeef-idyt7477";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ibanking-idtu4892.md": {
	id: "tr-ibanking-idtu4892.md";
  slug: "tr-ibanking-idtu4892";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-bakersfield-insi-ue1ibe.md": {
	id: "tr-inside-sales-associate-bakersfield-insi-ue1ibe.md";
  slug: "tr-inside-sales-associate-bakersfield-insi-ue1ibe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-beaverton-insi-vdeb75.md": {
	id: "tr-inside-sales-associate-beaverton-insi-vdeb75.md";
  slug: "tr-inside-sales-associate-beaverton-insi-vdeb75";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-bellevue-insi-tfkic9.md": {
	id: "tr-inside-sales-associate-bellevue-insi-tfkic9.md";
  slug: "tr-inside-sales-associate-bellevue-insi-tfkic9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-carlsbad-insi-v1jaud.md": {
	id: "tr-inside-sales-associate-carlsbad-insi-v1jaud.md";
  slug: "tr-inside-sales-associate-carlsbad-insi-v1jaud";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-corona-insi-u9gxwr.md": {
	id: "tr-inside-sales-associate-corona-insi-u9gxwr.md";
  slug: "tr-inside-sales-associate-corona-insi-u9gxwr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-lancaster-insi-9hci2w.md": {
	id: "tr-inside-sales-associate-lancaster-insi-9hci2w.md";
  slug: "tr-inside-sales-associate-lancaster-insi-9hci2w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-los-angeles-insi-93f0d5.md": {
	id: "tr-inside-sales-associate-los-angeles-insi-93f0d5.md";
  slug: "tr-inside-sales-associate-los-angeles-insi-93f0d5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-medford-insi-oxv4pg.md": {
	id: "tr-inside-sales-associate-medford-insi-oxv4pg.md";
  slug: "tr-inside-sales-associate-medford-insi-oxv4pg";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-riverside-insi-0hoj8n.md": {
	id: "tr-inside-sales-associate-riverside-insi-0hoj8n.md";
  slug: "tr-inside-sales-associate-riverside-insi-0hoj8n";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-salem-insi-a2ahco.md": {
	id: "tr-inside-sales-associate-salem-insi-a2ahco.md";
  slug: "tr-inside-sales-associate-salem-insi-a2ahco";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-salinas-insi-rbxwzq.md": {
	id: "tr-inside-sales-associate-salinas-insi-rbxwzq.md";
  slug: "tr-inside-sales-associate-salinas-insi-rbxwzq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-san-diego-insi-omswhi.md": {
	id: "tr-inside-sales-associate-san-diego-insi-omswhi.md";
  slug: "tr-inside-sales-associate-san-diego-insi-omswhi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-seattle-insi-vubhzn.md": {
	id: "tr-inside-sales-associate-seattle-insi-vubhzn.md";
  slug: "tr-inside-sales-associate-seattle-insi-vubhzn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-springfield-insi-yyx16y.md": {
	id: "tr-inside-sales-associate-springfield-insi-yyx16y.md";
  slug: "tr-inside-sales-associate-springfield-insi-yyx16y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-associate-temecula-insi-j4i7m1.md": {
	id: "tr-inside-sales-associate-temecula-insi-j4i7m1.md";
  slug: "tr-inside-sales-associate-temecula-insi-j4i7m1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-inside-sales-rep-fort-worth-insi-rse82a.md": {
	id: "tr-inside-sales-rep-fort-worth-insi-rse82a.md";
  slug: "tr-inside-sales-rep-fort-worth-insi-rse82a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-it-operations-specialist-compton-it-o-hegzwo.md": {
	id: "tr-it-operations-specialist-compton-it-o-hegzwo.md";
  slug: "tr-it-operations-specialist-compton-it-o-hegzwo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-it-operations-specialist-west-covina-it-o-4zlkhr.md": {
	id: "tr-it-operations-specialist-west-covina-it-o-4zlkhr.md";
  slug: "tr-it-operations-specialist-west-covina-it-o-4zlkhr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-anaheim-juni-bb6k02.md": {
	id: "tr-junior-account-executive-anaheim-juni-bb6k02.md";
  slug: "tr-junior-account-executive-anaheim-juni-bb6k02";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-hayward-juni-6te3eh.md": {
	id: "tr-junior-account-executive-hayward-juni-6te3eh.md";
  slug: "tr-junior-account-executive-hayward-juni-6te3eh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-modesto-juni-i2z9ra.md": {
	id: "tr-junior-account-executive-modesto-juni-i2z9ra.md";
  slug: "tr-junior-account-executive-modesto-juni-i2z9ra";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-murrieta-juni-x5jebc.md": {
	id: "tr-junior-account-executive-murrieta-juni-x5jebc.md";
  slug: "tr-junior-account-executive-murrieta-juni-x5jebc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-oakland-juni-yhc3l9.md": {
	id: "tr-junior-account-executive-oakland-juni-yhc3l9.md";
  slug: "tr-junior-account-executive-oakland-juni-yhc3l9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-oceanside-juni-6jjdt1.md": {
	id: "tr-junior-account-executive-oceanside-juni-6jjdt1.md";
  slug: "tr-junior-account-executive-oceanside-juni-6jjdt1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-ontario-juni-cap6m6.md": {
	id: "tr-junior-account-executive-ontario-juni-cap6m6.md";
  slug: "tr-junior-account-executive-ontario-juni-cap6m6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-palmdale-juni-end8s9.md": {
	id: "tr-junior-account-executive-palmdale-juni-end8s9.md";
  slug: "tr-junior-account-executive-palmdale-juni-end8s9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-account-executive-santa-rosa-juni-ujr1qx.md": {
	id: "tr-junior-account-executive-santa-rosa-juni-ujr1qx.md";
  slug: "tr-junior-account-executive-santa-rosa-juni-ujr1qx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-corvallis-juni-0pd2ej.md": {
	id: "tr-junior-sdr-corvallis-juni-0pd2ej.md";
  slug: "tr-junior-sdr-corvallis-juni-0pd2ej";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-elk-grove-juni-1ckywt.md": {
	id: "tr-junior-sdr-elk-grove-juni-1ckywt.md";
  slug: "tr-junior-sdr-elk-grove-juni-1ckywt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-escondido-juni-9q71fw.md": {
	id: "tr-junior-sdr-escondido-juni-9q71fw.md";
  slug: "tr-junior-sdr-escondido-juni-9q71fw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-hillsboro-juni-igf7bj.md": {
	id: "tr-junior-sdr-hillsboro-juni-igf7bj.md";
  slug: "tr-junior-sdr-hillsboro-juni-igf7bj";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-sacramento-juni-csdz1k.md": {
	id: "tr-junior-sdr-sacramento-juni-csdz1k.md";
  slug: "tr-junior-sdr-sacramento-juni-csdz1k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-santa-ana-juni-z9gkjo.md": {
	id: "tr-junior-sdr-santa-ana-juni-z9gkjo.md";
  slug: "tr-junior-sdr-santa-ana-juni-z9gkjo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-junior-sdr-stockton-juni-0y22ya.md": {
	id: "tr-junior-sdr-stockton-juni-0y22ya.md";
  slug: "tr-junior-sdr-stockton-juni-0y22ya";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-lead-ios-developer-houston-lead-uyr5c1.md": {
	id: "tr-lead-ios-developer-houston-lead-uyr5c1.md";
  slug: "tr-lead-ios-developer-houston-lead-uyr5c1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-lead-ios-developer-san-diego-lead-ahsmn1.md": {
	id: "tr-lead-ios-developer-san-diego-lead-ahsmn1.md";
  slug: "tr-lead-ios-developer-san-diego-lead-ahsmn1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-legal-documentation-idbd9023.md": {
	id: "tr-legal-documentation-idbd9023.md";
  slug: "tr-legal-documentation-idbd9023";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-machine-learning-engineer-lake-forest-mach-2hunlf.md": {
	id: "tr-machine-learning-engineer-lake-forest-mach-2hunlf.md";
  slug: "tr-machine-learning-engineer-lake-forest-mach-2hunlf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-machine-learning-engineer-palmdale-mach-l96e0w.md": {
	id: "tr-machine-learning-engineer-palmdale-mach-l96e0w.md";
  slug: "tr-machine-learning-engineer-palmdale-mach-l96e0w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-app-developer-glendale-mobi-ukf2nt.md": {
	id: "tr-mobile-app-developer-glendale-mobi-ukf2nt.md";
  slug: "tr-mobile-app-developer-glendale-mobi-ukf2nt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-app-developer-lakewood-mobi-dkwzwq.md": {
	id: "tr-mobile-app-developer-lakewood-mobi-dkwzwq.md";
  slug: "tr-mobile-app-developer-lakewood-mobi-dkwzwq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-app-developer-whittier-mobi-v6458w.md": {
	id: "tr-mobile-app-developer-whittier-mobi-v6458w.md";
  slug: "tr-mobile-app-developer-whittier-mobi-v6458w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-architecture-lead-philadelphia-mobi-6281nk.md": {
	id: "tr-mobile-architecture-lead-philadelphia-mobi-6281nk.md";
  slug: "tr-mobile-architecture-lead-philadelphia-mobi-6281nk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-devops-engineer-dallas-mobi-2w0yz1.md": {
	id: "tr-mobile-devops-engineer-dallas-mobi-2w0yz1.md";
  slug: "tr-mobile-devops-engineer-dallas-mobi-2w0yz1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-mobile-devops-engineer-jacksonville-mobi-1o5rjt.md": {
	id: "tr-mobile-devops-engineer-jacksonville-mobi-1o5rjt.md";
  slug: "tr-mobile-devops-engineer-jacksonville-mobi-1o5rjt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-columbus-reac-uni01s.md": {
	id: "tr-react-native-engineer-columbus-reac-uni01s.md";
  slug: "tr-react-native-engineer-columbus-reac-uni01s";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-los angeles-reac-c6qpok.md": {
	id: "tr-react-native-engineer-los angeles-reac-c6qpok.md";
  slug: "tr-react-native-engineer-los-angeles-reac-c6qpok";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-los-angeles-reac-7cbgxv.md": {
	id: "tr-react-native-engineer-los-angeles-reac-7cbgxv.md";
  slug: "tr-react-native-engineer-los-angeles-reac-7cbgxv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-new-york-city-reac-3lgxgx.md": {
	id: "tr-react-native-engineer-new-york-city-reac-3lgxgx.md";
  slug: "tr-react-native-engineer-new-york-city-reac-3lgxgx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-new-york-city-reac-qlz098.md": {
	id: "tr-react-native-engineer-new-york-city-reac-qlz098.md";
  slug: "tr-react-native-engineer-new-york-city-reac-qlz098";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-san diego-reac-6vitbw.md": {
	id: "tr-react-native-engineer-san diego-reac-6vitbw.md";
  slug: "tr-react-native-engineer-san-diego-reac-6vitbw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-san francisco-reac-oxwwul.md": {
	id: "tr-react-native-engineer-san francisco-reac-oxwwul.md";
  slug: "tr-react-native-engineer-san-francisco-reac-oxwwul";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-san jose-reac-qj7jll.md": {
	id: "tr-react-native-engineer-san jose-reac-qj7jll.md";
  slug: "tr-react-native-engineer-san-jose-reac-qj7jll";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-react-native-engineer-san-antonio-reac-plx4sn.md": {
	id: "tr-react-native-engineer-san-antonio-reac-plx4sn.md";
  slug: "tr-react-native-engineer-san-antonio-reac-plx4sn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-bellingham-saas-s6wimu.md": {
	id: "tr-saas-account-executive-bellingham-saas-s6wimu.md";
  slug: "tr-saas-account-executive-bellingham-saas-s6wimu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-federal-way-saas-3v0bmr.md": {
	id: "tr-saas-account-executive-federal-way-saas-3v0bmr.md";
  slug: "tr-saas-account-executive-federal-way-saas-3v0bmr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-marysville-saas-v3p38c.md": {
	id: "tr-saas-account-executive-marysville-saas-v3p38c.md";
  slug: "tr-saas-account-executive-marysville-saas-v3p38c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-murrieta-saas-k2d5zn.md": {
	id: "tr-saas-account-executive-murrieta-saas-k2d5zn.md";
  slug: "tr-saas-account-executive-murrieta-saas-k2d5zn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-renton-saas-lu595z.md": {
	id: "tr-saas-account-executive-renton-saas-lu595z.md";
  slug: "tr-saas-account-executive-renton-saas-lu595z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-spokane-saas-9bnh8v.md": {
	id: "tr-saas-account-executive-spokane-saas-9bnh8v.md";
  slug: "tr-saas-account-executive-spokane-saas-9bnh8v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-tacoma-saas-466ilf.md": {
	id: "tr-saas-account-executive-tacoma-saas-466ilf.md";
  slug: "tr-saas-account-executive-tacoma-saas-466ilf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-account-executive-vancouver-saas-8urn1a.md": {
	id: "tr-saas-account-executive-vancouver-saas-8urn1a.md";
  slug: "tr-saas-account-executive-vancouver-saas-8urn1a";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-bakersfield-saas-d0g99x.md": {
	id: "tr-saas-sdr-bakersfield-saas-d0g99x.md";
  slug: "tr-saas-sdr-bakersfield-saas-d0g99x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-carlsbad-saas-h3575m.md": {
	id: "tr-saas-sdr-carlsbad-saas-h3575m.md";
  slug: "tr-saas-sdr-carlsbad-saas-h3575m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-everett-saas-p1v6dz.md": {
	id: "tr-saas-sdr-everett-saas-p1v6dz.md";
  slug: "tr-saas-sdr-everett-saas-p1v6dz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-kent-saas-qrclnu.md": {
	id: "tr-saas-sdr-kent-saas-qrclnu.md";
  slug: "tr-saas-sdr-kent-saas-qrclnu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-pasco-saas-h40b5i.md": {
	id: "tr-saas-sdr-pasco-saas-h40b5i.md";
  slug: "tr-saas-sdr-pasco-saas-h40b5i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-saas-sdr-santa-clarita-saas-iwjequ.md": {
	id: "tr-saas-sdr-santa-clarita-saas-iwjequ.md";
  slug: "tr-saas-sdr-santa-clarita-saas-iwjequ";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-anaheim-sale-q6ia29.md": {
	id: "tr-sales-operations-coordinator-anaheim-sale-q6ia29.md";
  slug: "tr-sales-operations-coordinator-anaheim-sale-q6ia29";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-bend-sale-z6kyny.md": {
	id: "tr-sales-operations-coordinator-bend-sale-z6kyny.md";
  slug: "tr-sales-operations-coordinator-bend-sale-z6kyny";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-escondido-sale-z644k5.md": {
	id: "tr-sales-operations-coordinator-escondido-sale-z644k5.md";
  slug: "tr-sales-operations-coordinator-escondido-sale-z644k5";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-eugene-sale-c3zfts.md": {
	id: "tr-sales-operations-coordinator-eugene-sale-c3zfts.md";
  slug: "tr-sales-operations-coordinator-eugene-sale-c3zfts";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-gresham-sale-46l4pz.md": {
	id: "tr-sales-operations-coordinator-gresham-sale-46l4pz.md";
  slug: "tr-sales-operations-coordinator-gresham-sale-46l4pz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-irvine-sale-fd1sl3.md": {
	id: "tr-sales-operations-coordinator-irvine-sale-fd1sl3.md";
  slug: "tr-sales-operations-coordinator-irvine-sale-fd1sl3";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-kennewick-sale-pplnuz.md": {
	id: "tr-sales-operations-coordinator-kennewick-sale-pplnuz.md";
  slug: "tr-sales-operations-coordinator-kennewick-sale-pplnuz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-temecula-sale-htt6k6.md": {
	id: "tr-sales-operations-coordinator-temecula-sale-htt6k6.md";
  slug: "tr-sales-operations-coordinator-temecula-sale-htt6k6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-coordinator-yakima-sale-962ovh.md": {
	id: "tr-sales-operations-coordinator-yakima-sale-962ovh.md";
  slug: "tr-sales-operations-coordinator-yakima-sale-962ovh";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-manager-irvine-sale-we4sai.md": {
	id: "tr-sales-operations-manager-irvine-sale-we4sai.md";
  slug: "tr-sales-operations-manager-irvine-sale-we4sai";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-manager-los-angeles-sale-bob5ij.md": {
	id: "tr-sales-operations-manager-los-angeles-sale-bob5ij.md";
  slug: "tr-sales-operations-manager-los-angeles-sale-bob5ij";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-manager-torrance-sale-mj601p.md": {
	id: "tr-sales-operations-manager-torrance-sale-mj601p.md";
  slug: "tr-sales-operations-manager-torrance-sale-mj601p";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-sales-operations-manager-westminster-sale-pkfh7k.md": {
	id: "tr-sales-operations-manager-westminster-sale-pkfh7k.md";
  slug: "tr-sales-operations-manager-westminster-sale-pkfh7k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-ios-engineer-austin-seni-lr7g9g.md": {
	id: "tr-senior-ios-engineer-austin-seni-lr7g9g.md";
  slug: "tr-senior-ios-engineer-austin-seni-lr7g9g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-ios-engineer-chicago-seni-nwivx8.md": {
	id: "tr-senior-ios-engineer-chicago-seni-nwivx8.md";
  slug: "tr-senior-ios-engineer-chicago-seni-nwivx8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-ios-engineer-fort-worth-seni-elvsci.md": {
	id: "tr-senior-ios-engineer-fort-worth-seni-elvsci.md";
  slug: "tr-senior-ios-engineer-fort-worth-seni-elvsci";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-ios-engineer-new-york-city-seni-yishvx.md": {
	id: "tr-senior-ios-engineer-new-york-city-seni-yishvx.md";
  slug: "tr-senior-ios-engineer-new-york-city-seni-yishvx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-ios-engineer-phoenix-seni-j1mvei.md": {
	id: "tr-senior-ios-engineer-phoenix-seni-j1mvei.md";
  slug: "tr-senior-ios-engineer-phoenix-seni-j1mvei";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-senior-mobile-application-developer-san-jose-seni-qxkv96.md": {
	id: "tr-senior-mobile-application-developer-san-jose-seni-qxkv96.md";
  slug: "tr-senior-mobile-application-developer-san-jose-seni-qxkv96";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-systems-administrator-lancaster-syst-x91j6u.md": {
	id: "tr-systems-administrator-lancaster-syst-x91j6u.md";
  slug: "tr-systems-administrator-lancaster-syst-x91j6u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-systems-administrator-los-angeles-syst-n6jyp0.md": {
	id: "tr-systems-administrator-los-angeles-syst-n6jyp0.md";
  slug: "tr-systems-administrator-los-angeles-syst-n6jyp0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-technical-support-engineer-alhambra-tech-zjslb7.md": {
	id: "tr-technical-support-engineer-alhambra-tech-zjslb7.md";
  slug: "tr-technical-support-engineer-alhambra-tech-zjslb7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-vp-ibank-idny8492.md": {
	id: "tr-vp-ibank-idny8492.md";
  slug: "tr-vp-ibank-idny8492";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
};
"posts": {
"10-high-paying-sales-jobs-you-can-get-without-a-degree.md": {
	id: "10-high-paying-sales-jobs-you-can-get-without-a-degree.md";
  slug: "10-high-paying-sales-jobs-you-can-get-without-a-degree";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"common-employee-benefits-in-orange-county-ca-private-sector.md": {
	id: "common-employee-benefits-in-orange-county-ca-private-sector.md";
  slug: "common-employee-benefits-in-orange-county-ca-private-sector";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-implement-structured-json-ld-for-google-jobs.md": {
	id: "how-to-implement-structured-json-ld-for-google-jobs.md";
  slug: "how-to-implement-structured-json-ld-for-google-jobs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"software-engineer-careers-orange-county.md": {
	id: "software-engineer-careers-orange-county.md";
  slug: "software-engineer-careers-orange-county";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"software-engineer-internships-orange-county.md": {
	id: "software-engineer-internships-orange-county.md";
  slug: "software-engineer-internships-orange-county";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"software-engineer-jobs-orange-county.md": {
	id: "software-engineer-jobs-orange-county.md";
  slug: "software-engineer-jobs-orange-county";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"software-engineer-salary-orange-county.md": {
	id: "software-engineer-salary-orange-county.md";
  slug: "software-engineer-salary-orange-county";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"software-engineering-positions-orange-county.md": {
	id: "software-engineering-positions-orange-county.md";
  slug: "software-engineering-positions-orange-county";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"when-to-follow-up-with-a-recruiter.md": {
	id: "when-to-follow-up-with-a-recruiter.md";
  slug: "when-to-follow-up-with-a-recruiter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
