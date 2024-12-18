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
"tr-fort-worth-aeef-idbf74881.md": {
	id: "tr-fort-worth-aeef-idbf74881.md";
  slug: "tr-fort-worth-aeef-idbf74881";
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
"tr-legal-documentation-idbd9023.md": {
	id: "tr-legal-documentation-idbd9023.md";
  slug: "tr-legal-documentation-idbd9023";
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
