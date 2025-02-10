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
"glossary": {
"absorption-rate.md": {
	id: "absorption-rate.md";
  slug: "absorption-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"accessorial-charges.md": {
	id: "accessorial-charges.md";
  slug: "accessorial-charges";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"activation-rate.md": {
	id: "activation-rate.md";
  slug: "activation-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"acv.md": {
	id: "acv.md";
  slug: "acv";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"angular.md": {
	id: "angular.md";
  slug: "angular";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"api-gateway.md": {
	id: "api-gateway.md";
  slug: "api-gateway";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"api-proficiency.md": {
	id: "api-proficiency.md";
  slug: "api-proficiency";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"arr.md": {
	id: "arr.md";
  slug: "arr";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"asp-net.md": {
	id: "asp-net.md";
  slug: "asp-net";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"authentication-authorization.md": {
	id: "authentication-authorization.md";
  slug: "authentication-authorization";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bare-metal-programming.md": {
	id: "bare-metal-programming.md";
  slug: "bare-metal-programming";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bill-of-lading-bol-.md": {
	id: "bill-of-lading-bol-.md";
  slug: "bill-of-lading-bol-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"blue-green-deployment.md": {
	id: "blue-green-deployment.md";
  slug: "blue-green-deployment";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bootloader.md": {
	id: "bootloader.md";
  slug: "bootloader";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"break-even-analysis.md": {
	id: "break-even-analysis.md";
  slug: "break-even-analysis";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"bug-bounty-programs.md": {
	id: "bug-bounty-programs.md";
  slug: "bug-bounty-programs";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cac.md": {
	id: "cac.md";
  slug: "cac";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"can-bus.md": {
	id: "can-bus.md";
  slug: "can-bus";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cap-rate.md": {
	id: "cap-rate.md";
  slug: "cap-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"capital-equipment-sales.md": {
	id: "capital-equipment-sales.md";
  slug: "capital-equipment-sales";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"chaos-engineering.md": {
	id: "chaos-engineering.md";
  slug: "chaos-engineering";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"charge-capture.md": {
	id: "charge-capture.md";
  slug: "charge-capture";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"churn-rate.md": {
	id: "churn-rate.md";
  slug: "churn-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"clinical-adoption.md": {
	id: "clinical-adoption.md";
  slug: "clinical-adoption";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cloud-cost-optimization.md": {
	id: "cloud-cost-optimization.md";
  slug: "cloud-cost-optimization";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cloud-native-security.md": {
	id: "cloud-native-security.md";
  slug: "cloud-native-security";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cloud-orchestration.md": {
	id: "cloud-orchestration.md";
  slug: "cloud-orchestration";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cloud-security-posture-management-cspm-.md": {
	id: "cloud-security-posture-management-cspm-.md";
  slug: "cloud-security-posture-management-cspm-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"code-review-standards.md": {
	id: "code-review-standards.md";
  slug: "code-review-standards";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"codebase-familiarity.md": {
	id: "codebase-familiarity.md";
  slug: "codebase-familiarity";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"conforming-loan-limit.md": {
	id: "conforming-loan-limit.md";
  slug: "conforming-loan-limit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"consumables-revenue.md": {
	id: "consumables-revenue.md";
  slug: "consumables-revenue";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"container-registry.md": {
	id: "container-registry.md";
  slug: "container-registry";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"container-security.md": {
	id: "container-security.md";
  slug: "container-security";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"containerization-skills.md": {
	id: "containerization-skills.md";
  slug: "containerization-skills";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"continuous-deployment-cd-.md": {
	id: "continuous-deployment-cd-.md";
  slug: "continuous-deployment-cd-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"continuous-integration-ci-.md": {
	id: "continuous-integration-ci-.md";
  slug: "continuous-integration-ci-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cross-docking.md": {
	id: "cross-docking.md";
  slug: "cross-docking";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cross-sell.md": {
	id: "cross-sell.md";
  slug: "cross-sell";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"cryptographic-hashing.md": {
	id: "cryptographic-hashing.md";
  slug: "cryptographic-hashing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"customer-expansion-rate.md": {
	id: "customer-expansion-rate.md";
  slug: "customer-expansion-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"customer-health-score.md": {
	id: "customer-health-score.md";
  slug: "customer-health-score";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"customer-payback-period.md": {
	id: "customer-payback-period.md";
  slug: "customer-payback-period";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"data-loss-prevention-dlp-.md": {
	id: "data-loss-prevention-dlp-.md";
  slug: "data-loss-prevention-dlp-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"database-optimization.md": {
	id: "database-optimization.md";
  slug: "database-optimization";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"deadhead-percentage.md": {
	id: "deadhead-percentage.md";
  slug: "deadhead-percentage";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"deal-size.md": {
	id: "deal-size.md";
  slug: "deal-size";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"debt-service-coverage-ratio-dscr-.md": {
	id: "debt-service-coverage-ratio-dscr-.md";
  slug: "debt-service-coverage-ratio-dscr-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"demo-conversion-rate.md": {
	id: "demo-conversion-rate.md";
  slug: "demo-conversion-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"device-utilization-rate.md": {
	id: "device-utilization-rate.md";
  slug: "device-utilization-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"dimensional-weight-pricing.md": {
	id: "dimensional-weight-pricing.md";
  slug: "dimensional-weight-pricing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"distributor-margin.md": {
	id: "distributor-margin.md";
  slug: "distributor-margin";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"django.md": {
	id: "django.md";
  slug: "django";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"docker.md": {
	id: "docker.md";
  slug: "docker";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"drayage-fee.md": {
	id: "drayage-fee.md";
  slug: "drayage-fee";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"drop-trailer-program.md": {
	id: "drop-trailer-program.md";
  slug: "drop-trailer-program";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"dual-agency.md": {
	id: "dual-agency.md";
  slug: "dual-agency";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"earnest-money-deposit.md": {
	id: "earnest-money-deposit.md";
  slug: "earnest-money-deposit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"edge-computing.md": {
	id: "edge-computing.md";
  slug: "edge-computing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"elastic-scaling.md": {
	id: "elastic-scaling.md";
  slug: "elastic-scaling";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"embedded-c-programming.md": {
	id: "embedded-c-programming.md";
  slug: "embedded-c-programming";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"embedded-machine-learning-edge-ai-.md": {
	id: "embedded-machine-learning-edge-ai-.md";
  slug: "embedded-machine-learning-edge-ai-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"embedded-security.md": {
	id: "embedded-security.md";
  slug: "embedded-security";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"endpoint-detection-and-response-edr-.md": {
	id: "endpoint-detection-and-response-edr-.md";
  slug: "endpoint-detection-and-response-edr-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"escalation-clause.md": {
	id: "escalation-clause.md";
  slug: "escalation-clause";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"escrow-holdback.md": {
	id: "escrow-holdback.md";
  slug: "escrow-holdback";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"event-driven-architecture.md": {
	id: "event-driven-architecture.md";
  slug: "event-driven-architecture";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"expansion-mrr.md": {
	id: "expansion-mrr.md";
  slug: "expansion-mrr";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"expansion-revenue.md": {
	id: "expansion-revenue.md";
  slug: "expansion-revenue";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"field-programmable-gate-array-fpga-.md": {
	id: "field-programmable-gate-array-fpga-.md";
  slug: "field-programmable-gate-array-fpga-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"firebase.md": {
	id: "firebase.md";
  slug: "firebase";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"flash-memory.md": {
	id: "flash-memory.md";
  slug: "flash-memory";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"flask.md": {
	id: "flask.md";
  slug: "flask";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"formulary-approval.md": {
	id: "formulary-approval.md";
  slug: "formulary-approval";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"freemium-conversion-rate.md": {
	id: "freemium-conversion-rate.md";
  slug: "freemium-conversion-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"freight-class.md": {
	id: "freight-class.md";
  slug: "freight-class";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"freight-consolidation.md": {
	id: "freight-consolidation.md";
  slug: "freight-consolidation";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"front-end-framework-experience.md": {
	id: "front-end-framework-experience.md";
  slug: "front-end-framework-experience";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"fuel-surcharge.md": {
	id: "fuel-surcharge.md";
  slug: "fuel-surcharge";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"full-stack-debugging.md": {
	id: "full-stack-debugging.md";
  slug: "full-stack-debugging";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"gitops.md": {
	id: "gitops.md";
  slug: "gitops";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"gpo-contract.md": {
	id: "gpo-contract.md";
  slug: "gpo-contract";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"graphql-api.md": {
	id: "graphql-api.md";
  slug: "graphql-api";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"graphql.md": {
	id: "graphql.md";
  slug: "graphql";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"haptic-feedback.md": {
	id: "haptic-feedback.md";
  slug: "haptic-feedback";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hospital-buy-in.md": {
	id: "hospital-buy-in.md";
  slug: "hospital-buy-in";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hospital-capital-budgeting.md": {
	id: "hospital-capital-budgeting.md";
  slug: "hospital-capital-budgeting";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hospital-standardization-initiative.md": {
	id: "hospital-standardization-initiative.md";
  slug: "hospital-standardization-initiative";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"hybrid-cloud.md": {
	id: "hybrid-cloud.md";
  slug: "hybrid-cloud";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"identity-and-access-management-iam-.md": {
	id: "identity-and-access-management-iam-.md";
  slug: "identity-and-access-management-iam-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"immutable-infrastructure.md": {
	id: "immutable-infrastructure.md";
  slug: "immutable-infrastructure";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"in-service-training.md": {
	id: "in-service-training.md";
  slug: "in-service-training";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"infrastructure-as-code-iac-.md": {
	id: "infrastructure-as-code-iac-.md";
  slug: "infrastructure-as-code-iac-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"insider-threat-detection.md": {
	id: "insider-threat-detection.md";
  slug: "insider-threat-detection";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"interrupt-handling.md": {
	id: "interrupt-handling.md";
  slug: "interrupt-handling";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"javascript.md": {
	id: "javascript.md";
  slug: "javascript";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"jtag-debugging.md": {
	id: "jtag-debugging.md";
  slug: "jtag-debugging";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"kubernetes-cluster-management.md": {
	id: "kubernetes-cluster-management.md";
  slug: "kubernetes-cluster-management";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"kubernetes.md": {
	id: "kubernetes.md";
  slug: "kubernetes";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"lane-pricing.md": {
	id: "lane-pricing.md";
  slug: "lane-pricing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"last-mile-delivery.md": {
	id: "last-mile-delivery.md";
  slug: "last-mile-delivery";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"lead-scoring.md": {
	id: "lead-scoring.md";
  slug: "lead-scoring";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"lead-velocity-rate.md": {
	id: "lead-velocity-rate.md";
  slug: "lead-velocity-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"leaseback-agreement.md": {
	id: "leaseback-agreement.md";
  slug: "leaseback-agreement";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"load-to-truck-ratio.md": {
	id: "load-to-truck-ratio.md";
  slug: "load-to-truck-ratio";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"loan-to-value-ratio-ltv-.md": {
	id: "loan-to-value-ratio-ltv-.md";
  slug: "loan-to-value-ratio-ltv-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"logo-retention.md": {
	id: "logo-retention.md";
  slug: "logo-retention";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"low-power-design.md": {
	id: "low-power-design.md";
  slug: "low-power-design";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ltv.md": {
	id: "ltv.md";
  slug: "ltv";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"microcontroller-unit-mcu-.md": {
	id: "microcontroller-unit-mcu-.md";
  slug: "microcontroller-unit-mcu-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"microservices-architecture.md": {
	id: "microservices-architecture.md";
  slug: "microservices-architecture";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mongodb.md": {
	id: "mongodb.md";
  slug: "mongodb";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"mrr.md": {
	id: "mrr.md";
  slug: "mrr";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"multi-cloud-strategy.md": {
	id: "multi-cloud-strategy.md";
  slug: "multi-cloud-strategy";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"multi-factor-authentication-mfa-.md": {
	id: "multi-factor-authentication-mfa-.md";
  slug: "multi-factor-authentication-mfa-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"net-revenue-retention.md": {
	id: "net-revenue-retention.md";
  slug: "net-revenue-retention";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"node-js.md": {
	id: "node-js.md";
  slug: "node-js";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"observability.md": {
	id: "observability.md";
  slug: "observability";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pallet-pricing.md": {
	id: "pallet-pricing.md";
  slug: "pallet-pricing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"payback-period.md": {
	id: "payback-period.md";
  slug: "payback-period";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"penetration-testing.md": {
	id: "penetration-testing.md";
  slug: "penetration-testing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"per-procedure-pricing.md": {
	id: "per-procedure-pricing.md";
  slug: "per-procedure-pricing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"performance-benchmarking.md": {
	id: "performance-benchmarking.md";
  slug: "performance-benchmarking";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pipeline-coverage.md": {
	id: "pipeline-coverage.md";
  slug: "pipeline-coverage";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"pocket-listing.md": {
	id: "pocket-listing.md";
  slug: "pocket-listing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"postgresql.md": {
	id: "postgresql.md";
  slug: "postgresql";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"power-management-ic-pmic-.md": {
	id: "power-management-ic-pmic-.md";
  slug: "power-management-ic-pmic-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"privilege-escalation.md": {
	id: "privilege-escalation.md";
  slug: "privilege-escalation";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"procurement-cycle.md": {
	id: "procurement-cycle.md";
  slug: "procurement-cycle";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"production-readiness.md": {
	id: "production-readiness.md";
  slug: "production-readiness";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"public-key-infrastructure-pki-.md": {
	id: "public-key-infrastructure-pki-.md";
  slug: "public-key-infrastructure-pki-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"python.md": {
	id: "python.md";
  slug: "python";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"quota-attainment.md": {
	id: "quota-attainment.md";
  slug: "quota-attainment";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ransomware-mitigation.md": {
	id: "ransomware-mitigation.md";
  slug: "ransomware-mitigation";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"react-js.md": {
	id: "react-js.md";
  slug: "react-js";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"real-time-operating-system-rtos-.md": {
	id: "real-time-operating-system-rtos-.md";
  slug: "real-time-operating-system-rtos-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"red-teaming.md": {
	id: "red-teaming.md";
  slug: "red-teaming";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"reimbursement-coding.md": {
	id: "reimbursement-coding.md";
  slug: "reimbursement-coding";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"rep-driven-sale.md": {
	id: "rep-driven-sale.md";
  slug: "rep-driven-sale";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"responsive-design-principles.md": {
	id: "responsive-design-principles.md";
  slug: "responsive-design-principles";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"rest-api.md": {
	id: "rest-api.md";
  slug: "rest-api";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"reverse-logistics.md": {
	id: "reverse-logistics.md";
  slug: "reverse-logistics";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"role-based-access-control-rbac-.md": {
	id: "role-based-access-control-rbac-.md";
  slug: "role-based-access-control-rbac-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"ruby-on-rails.md": {
	id: "ruby-on-rails.md";
  slug: "ruby-on-rails";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sales-cycle-length.md": {
	id: "sales-cycle-length.md";
  slug: "sales-cycle-length";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sales-efficiency.md": {
	id: "sales-efficiency.md";
  slug: "sales-efficiency";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sales-velocity.md": {
	id: "sales-velocity.md";
  slug: "sales-velocity";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"scalability-mindset.md": {
	id: "scalability-mindset.md";
  slug: "scalability-mindset";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"secure-software-development-lifecycle-ssdlc-.md": {
	id: "secure-software-development-lifecycle-ssdlc-.md";
  slug: "secure-software-development-lifecycle-ssdlc-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"security-information-and-event-management-siem-.md": {
	id: "security-information-and-event-management-siem-.md";
  slug: "security-information-and-event-management-siem-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"security-orchestration-automation-and-response-soar-.md": {
	id: "security-orchestration-automation-and-response-soar-.md";
  slug: "security-orchestration-automation-and-response-soar-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"sensor-fusion.md": {
	id: "sensor-fusion.md";
  slug: "sensor-fusion";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"serverless-computing.md": {
	id: "serverless-computing.md";
  slug: "serverless-computing";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"serverless-deployment.md": {
	id: "serverless-deployment.md";
  slug: "serverless-deployment";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"service-level-agreement-sla-.md": {
	id: "service-level-agreement-sla-.md";
  slug: "service-level-agreement-sla-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"service-mesh.md": {
	id: "service-mesh.md";
  slug: "service-mesh";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"shadow-inventory.md": {
	id: "shadow-inventory.md";
  slug: "shadow-inventory";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"spring-boot.md": {
	id: "spring-boot.md";
  slug: "spring-boot";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"surgeon-preference-item-spi-.md": {
	id: "surgeon-preference-item-spi-.md";
  slug: "surgeon-preference-item-spi-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"system-on-chip-soc-.md": {
	id: "system-on-chip-soc-.md";
  slug: "system-on-chip-soc-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"tcv.md": {
	id: "tcv.md";
  slug: "tcv";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"tech-stack-fit.md": {
	id: "tech-stack-fit.md";
  slug: "tech-stack-fit";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"test-driven-development-tdd-.md": {
	id: "test-driven-development-tdd-.md";
  slug: "test-driven-development-tdd-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"threat-intelligence.md": {
	id: "threat-intelligence.md";
  slug: "threat-intelligence";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"time-sensitive-networking-tsn-.md": {
	id: "time-sensitive-networking-tsn-.md";
  slug: "time-sensitive-networking-tsn-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"title-contingency.md": {
	id: "title-contingency.md";
  slug: "title-contingency";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"typescript.md": {
	id: "typescript.md";
  slug: "typescript";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"uart-communication.md": {
	id: "uart-communication.md";
  slug: "uart-communication";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"underwriting-approval.md": {
	id: "underwriting-approval.md";
  slug: "underwriting-approval";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"upsell.md": {
	id: "upsell.md";
  slug: "upsell";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"value-analysis-committee-vac-.md": {
	id: "value-analysis-committee-vac-.md";
  slug: "value-analysis-committee-vac-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"version-control-strategy.md": {
	id: "version-control-strategy.md";
  slug: "version-control-strategy";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"vue-js.md": {
	id: "vue-js.md";
  slug: "vue-js";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"watchdog-timer.md": {
	id: "watchdog-timer.md";
  slug: "watchdog-timer";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"web-application-firewall-waf-.md": {
	id: "web-application-firewall-waf-.md";
  slug: "web-application-firewall-waf-";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"web-performance-optimization.md": {
	id: "web-performance-optimization.md";
  slug: "web-performance-optimization";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"wholesaling.md": {
	id: "wholesaling.md";
  slug: "wholesaling";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"win-rate.md": {
	id: "win-rate.md";
  slug: "win-rate";
  body: string;
  collection: "glossary";
  data: any
} & { render(): Render[".md"] };
"zero-trust-architecture.md": {
	id: "zero-trust-architecture.md";
  slug: "zero-trust-architecture";
  body: string;
  collection: "glossary";
  data: any
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
"tr-ef-ae-anaheim-hills-id-fd9402.md": {
	id: "tr-ef-ae-anaheim-hills-id-fd9402.md";
  slug: "tr-ef-ae-anaheim-hills-id-fd9402";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tr-ef-ae-irvine-id-hh3891.md": {
	id: "tr-ef-ae-irvine-id-hh3891.md";
  slug: "tr-ef-ae-irvine-id-hh3891";
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
"tustin-recruiting-account-executive-belmont-tustyoit6t.md": {
	id: "tustin-recruiting-account-executive-belmont-tustyoit6t.md";
  slug: "tustin-recruiting-account-executive-belmont-tustyoit6t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-corvallis-tustk4f3h7.md": {
	id: "tustin-recruiting-account-executive-corvallis-tustk4f3h7.md";
  slug: "tustin-recruiting-account-executive-corvallis-tustk4f3h7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-gresham-tustvfotow.md": {
	id: "tustin-recruiting-account-executive-gresham-tustvfotow.md";
  slug: "tustin-recruiting-account-executive-gresham-tustvfotow";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-huntington-beach-tustm54zc9.md": {
	id: "tustin-recruiting-account-executive-huntington-beach-tustm54zc9.md";
  slug: "tustin-recruiting-account-executive-huntington-beach-tustm54zc9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-los-angeles-tust9bmwid.md": {
	id: "tustin-recruiting-account-executive-los-angeles-tust9bmwid.md";
  slug: "tustin-recruiting-account-executive-los-angeles-tust9bmwid";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-oakland-tustvkwfqo.md": {
	id: "tustin-recruiting-account-executive-oakland-tustvkwfqo.md";
  slug: "tustin-recruiting-account-executive-oakland-tustvkwfqo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-san-carlos-tustsrsflz.md": {
	id: "tustin-recruiting-account-executive-san-carlos-tustsrsflz.md";
  slug: "tustin-recruiting-account-executive-san-carlos-tustsrsflz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-account-executive-santa-clarita-tust4pg74v.md": {
	id: "tustin-recruiting-account-executive-santa-clarita-tust4pg74v.md";
  slug: "tustin-recruiting-account-executive-santa-clarita-tust4pg74v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-burbank-tustbvzbev.md": {
	id: "tustin-recruiting-business-development-manager-burbank-tustbvzbev.md";
  slug: "tustin-recruiting-business-development-manager-burbank-tustbvzbev";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-burbank-tustcf2p27.md": {
	id: "tustin-recruiting-business-development-manager-burbank-tustcf2p27.md";
  slug: "tustin-recruiting-business-development-manager-burbank-tustcf2p27";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-costa-mesa-tustj609jv.md": {
	id: "tustin-recruiting-business-development-manager-costa-mesa-tustj609jv.md";
  slug: "tustin-recruiting-business-development-manager-costa-mesa-tustj609jv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-dublin-tustttd7w6.md": {
	id: "tustin-recruiting-business-development-manager-dublin-tustttd7w6.md";
  slug: "tustin-recruiting-business-development-manager-dublin-tustttd7w6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-manhattan-beach-tustwvbsku.md": {
	id: "tustin-recruiting-business-development-manager-manhattan-beach-tustwvbsku.md";
  slug: "tustin-recruiting-business-development-manager-manhattan-beach-tustwvbsku";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-newport-beach-tusttqk9m1.md": {
	id: "tustin-recruiting-business-development-manager-newport-beach-tusttqk9m1.md";
  slug: "tustin-recruiting-business-development-manager-newport-beach-tusttqk9m1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-pasadena-tustotcy2z.md": {
	id: "tustin-recruiting-business-development-manager-pasadena-tustotcy2z.md";
  slug: "tustin-recruiting-business-development-manager-pasadena-tustotcy2z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-pleasanton-tust2i71ne.md": {
	id: "tustin-recruiting-business-development-manager-pleasanton-tust2i71ne.md";
  slug: "tustin-recruiting-business-development-manager-pleasanton-tust2i71ne";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-portland-tusthnxwra.md": {
	id: "tustin-recruiting-business-development-manager-portland-tusthnxwra.md";
  slug: "tustin-recruiting-business-development-manager-portland-tusthnxwra";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-renton-tust1av8vb.md": {
	id: "tustin-recruiting-business-development-manager-renton-tust1av8vb.md";
  slug: "tustin-recruiting-business-development-manager-renton-tust1av8vb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-sacramento-tustvmhery.md": {
	id: "tustin-recruiting-business-development-manager-sacramento-tustvmhery.md";
  slug: "tustin-recruiting-business-development-manager-sacramento-tustvmhery";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-business-development-manager-san-francisco-tustiy32uu.md": {
	id: "tustin-recruiting-business-development-manager-san-francisco-tustiy32uu.md";
  slug: "tustin-recruiting-business-development-manager-san-francisco-tustiy32uu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-bend-tusttsm74c.md": {
	id: "tustin-recruiting-channel-sales-manager-bend-tusttsm74c.md";
  slug: "tustin-recruiting-channel-sales-manager-bend-tusttsm74c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-brisbane-tustdffmzx.md": {
	id: "tustin-recruiting-channel-sales-manager-brisbane-tustdffmzx.md";
  slug: "tustin-recruiting-channel-sales-manager-brisbane-tustdffmzx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-glendale-tustnes1kf.md": {
	id: "tustin-recruiting-channel-sales-manager-glendale-tustnes1kf.md";
  slug: "tustin-recruiting-channel-sales-manager-glendale-tustnes1kf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-huntington-beach-tustqmxo0i.md": {
	id: "tustin-recruiting-channel-sales-manager-huntington-beach-tustqmxo0i.md";
  slug: "tustin-recruiting-channel-sales-manager-huntington-beach-tustqmxo0i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-issaquah-tuste5n6ec.md": {
	id: "tustin-recruiting-channel-sales-manager-issaquah-tuste5n6ec.md";
  slug: "tustin-recruiting-channel-sales-manager-issaquah-tuste5n6ec";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-kirkland-tustcesmxl.md": {
	id: "tustin-recruiting-channel-sales-manager-kirkland-tustcesmxl.md";
  slug: "tustin-recruiting-channel-sales-manager-kirkland-tustcesmxl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-la-jolla-tustr0szo1.md": {
	id: "tustin-recruiting-channel-sales-manager-la-jolla-tustr0szo1.md";
  slug: "tustin-recruiting-channel-sales-manager-la-jolla-tustr0szo1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-medford-tustjfpvcd.md": {
	id: "tustin-recruiting-channel-sales-manager-medford-tustjfpvcd.md";
  slug: "tustin-recruiting-channel-sales-manager-medford-tustjfpvcd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-san-bruno-tustmy0w5z.md": {
	id: "tustin-recruiting-channel-sales-manager-san-bruno-tustmy0w5z.md";
  slug: "tustin-recruiting-channel-sales-manager-san-bruno-tustmy0w5z";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-san-rafael-tust2uivvi.md": {
	id: "tustin-recruiting-channel-sales-manager-san-rafael-tust2uivvi.md";
  slug: "tustin-recruiting-channel-sales-manager-san-rafael-tust2uivvi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-santa-barbara-tustszx55t.md": {
	id: "tustin-recruiting-channel-sales-manager-santa-barbara-tustszx55t.md";
  slug: "tustin-recruiting-channel-sales-manager-santa-barbara-tustszx55t";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-seattle-tustyxo5i4.md": {
	id: "tustin-recruiting-channel-sales-manager-seattle-tustyxo5i4.md";
  slug: "tustin-recruiting-channel-sales-manager-seattle-tustyxo5i4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-sunnyvale-tustflbip6.md": {
	id: "tustin-recruiting-channel-sales-manager-sunnyvale-tustflbip6.md";
  slug: "tustin-recruiting-channel-sales-manager-sunnyvale-tustflbip6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-channel-sales-manager-venice-tustaapbkd.md": {
	id: "tustin-recruiting-channel-sales-manager-venice-tustaapbkd.md";
  slug: "tustin-recruiting-channel-sales-manager-venice-tustaapbkd";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-escondido-tustk1zud8.md": {
	id: "tustin-recruiting-data-scientist-escondido-tustk1zud8.md";
  slug: "tustin-recruiting-data-scientist-escondido-tustk1zud8";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-fullerton-tust97t0yc.md": {
	id: "tustin-recruiting-data-scientist-fullerton-tust97t0yc.md";
  slug: "tustin-recruiting-data-scientist-fullerton-tust97t0yc";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-garden-grove-tust7gpt26.md": {
	id: "tustin-recruiting-data-scientist-garden-grove-tust7gpt26.md";
  slug: "tustin-recruiting-data-scientist-garden-grove-tust7gpt26";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-huntington-beach-tust2kejne.md": {
	id: "tustin-recruiting-data-scientist-huntington-beach-tust2kejne.md";
  slug: "tustin-recruiting-data-scientist-huntington-beach-tust2kejne";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-los-angeles-tustd5teo1.md": {
	id: "tustin-recruiting-data-scientist-los-angeles-tustd5teo1.md";
  slug: "tustin-recruiting-data-scientist-los-angeles-tustd5teo1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-pasadena-tustm197k9.md": {
	id: "tustin-recruiting-data-scientist-pasadena-tustm197k9.md";
  slug: "tustin-recruiting-data-scientist-pasadena-tustm197k9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-san-diego-tust3hax6q.md": {
	id: "tustin-recruiting-data-scientist-san-diego-tust3hax6q.md";
  slug: "tustin-recruiting-data-scientist-san-diego-tust3hax6q";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-data-scientist-west-covina-tustckztcz.md": {
	id: "tustin-recruiting-data-scientist-west-covina-tustckztcz.md";
  slug: "tustin-recruiting-data-scientist-west-covina-tustckztcz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-anaheim-tust708p28.md": {
	id: "tustin-recruiting-devops-engineer-anaheim-tust708p28.md";
  slug: "tustin-recruiting-devops-engineer-anaheim-tust708p28";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-bellevue-tusty08goe.md": {
	id: "tustin-recruiting-devops-engineer-bellevue-tusty08goe.md";
  slug: "tustin-recruiting-devops-engineer-bellevue-tusty08goe";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-berkeley-tustydm4zt.md": {
	id: "tustin-recruiting-devops-engineer-berkeley-tustydm4zt.md";
  slug: "tustin-recruiting-devops-engineer-berkeley-tustydm4zt";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-encinitas-tust73di3w.md": {
	id: "tustin-recruiting-devops-engineer-encinitas-tust73di3w.md";
  slug: "tustin-recruiting-devops-engineer-encinitas-tust73di3w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-huntington-beach-tustd7n985.md": {
	id: "tustin-recruiting-devops-engineer-huntington-beach-tustd7n985.md";
  slug: "tustin-recruiting-devops-engineer-huntington-beach-tustd7n985";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-irvine-tustvror6m.md": {
	id: "tustin-recruiting-devops-engineer-irvine-tustvror6m.md";
  slug: "tustin-recruiting-devops-engineer-irvine-tustvror6m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-mission-viejo-tust8qlscl.md": {
	id: "tustin-recruiting-devops-engineer-mission-viejo-tust8qlscl.md";
  slug: "tustin-recruiting-devops-engineer-mission-viejo-tust8qlscl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-mission-viejo-tustm7qekw.md": {
	id: "tustin-recruiting-devops-engineer-mission-viejo-tustm7qekw.md";
  slug: "tustin-recruiting-devops-engineer-mission-viejo-tustm7qekw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-mountain-view-tustf3r09m.md": {
	id: "tustin-recruiting-devops-engineer-mountain-view-tustf3r09m.md";
  slug: "tustin-recruiting-devops-engineer-mountain-view-tustf3r09m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-oceanside-tusth6shdb.md": {
	id: "tustin-recruiting-devops-engineer-oceanside-tusth6shdb.md";
  slug: "tustin-recruiting-devops-engineer-oceanside-tusth6shdb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-palo-alto-tustcxhf9m.md": {
	id: "tustin-recruiting-devops-engineer-palo-alto-tustcxhf9m.md";
  slug: "tustin-recruiting-devops-engineer-palo-alto-tustcxhf9m";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-sammamish-tust5jc3jl.md": {
	id: "tustin-recruiting-devops-engineer-sammamish-tust5jc3jl.md";
  slug: "tustin-recruiting-devops-engineer-sammamish-tust5jc3jl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-san-marcos-tusts451v4.md": {
	id: "tustin-recruiting-devops-engineer-san-marcos-tusts451v4.md";
  slug: "tustin-recruiting-devops-engineer-san-marcos-tusts451v4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-san-ramon-tustmo4kn0.md": {
	id: "tustin-recruiting-devops-engineer-san-ramon-tustmo4kn0.md";
  slug: "tustin-recruiting-devops-engineer-san-ramon-tustmo4kn0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-santa-monica-tustnf9cwz.md": {
	id: "tustin-recruiting-devops-engineer-santa-monica-tustnf9cwz.md";
  slug: "tustin-recruiting-devops-engineer-santa-monica-tustnf9cwz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-torrance-tustu6bdiv.md": {
	id: "tustin-recruiting-devops-engineer-torrance-tustu6bdiv.md";
  slug: "tustin-recruiting-devops-engineer-torrance-tustu6bdiv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-union-city-tust04fp9k.md": {
	id: "tustin-recruiting-devops-engineer-union-city-tust04fp9k.md";
  slug: "tustin-recruiting-devops-engineer-union-city-tust04fp9k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-devops-engineer-vista-tust3si2hq.md": {
	id: "tustin-recruiting-devops-engineer-vista-tust3si2hq.md";
  slug: "tustin-recruiting-devops-engineer-vista-tust3si2hq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-beverly-hills-tustbjt5wu.md": {
	id: "tustin-recruiting-enterprise-account-executive-beverly-hills-tustbjt5wu.md";
  slug: "tustin-recruiting-enterprise-account-executive-beverly-hills-tustbjt5wu";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-cupertino-tust5fsnmn.md": {
	id: "tustin-recruiting-enterprise-account-executive-cupertino-tust5fsnmn.md";
  slug: "tustin-recruiting-enterprise-account-executive-cupertino-tust5fsnmn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-el-monte-tustl1wkhw.md": {
	id: "tustin-recruiting-enterprise-account-executive-el-monte-tustl1wkhw.md";
  slug: "tustin-recruiting-enterprise-account-executive-el-monte-tustl1wkhw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-glendale-tustl68c6k.md": {
	id: "tustin-recruiting-enterprise-account-executive-glendale-tustl68c6k.md";
  slug: "tustin-recruiting-enterprise-account-executive-glendale-tustl68c6k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-hillsboro-tustjujyjq.md": {
	id: "tustin-recruiting-enterprise-account-executive-hillsboro-tustjujyjq.md";
  slug: "tustin-recruiting-enterprise-account-executive-hillsboro-tustjujyjq";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-marina-del-rey-tustel95fm.md": {
	id: "tustin-recruiting-enterprise-account-executive-marina-del-rey-tustel95fm.md";
  slug: "tustin-recruiting-enterprise-account-executive-marina-del-rey-tustel95fm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-morgan-hill-tustih6oea.md": {
	id: "tustin-recruiting-enterprise-account-executive-morgan-hill-tustih6oea.md";
  slug: "tustin-recruiting-enterprise-account-executive-morgan-hill-tustih6oea";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-novato-tustxpqezz.md": {
	id: "tustin-recruiting-enterprise-account-executive-novato-tustxpqezz.md";
  slug: "tustin-recruiting-enterprise-account-executive-novato-tustxpqezz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-redwood-city-tust1v5uni.md": {
	id: "tustin-recruiting-enterprise-account-executive-redwood-city-tust1v5uni.md";
  slug: "tustin-recruiting-enterprise-account-executive-redwood-city-tust1v5uni";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-san-mateo-tustvpmbj7.md": {
	id: "tustin-recruiting-enterprise-account-executive-san-mateo-tustvpmbj7.md";
  slug: "tustin-recruiting-enterprise-account-executive-san-mateo-tustvpmbj7";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-account-executive-west-hollywood-tustgvib15.md": {
	id: "tustin-recruiting-enterprise-account-executive-west-hollywood-tustgvib15.md";
  slug: "tustin-recruiting-enterprise-account-executive-west-hollywood-tustgvib15";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-software-sales-carlsbad-tust1tj509.md": {
	id: "tustin-recruiting-enterprise-software-sales-carlsbad-tust1tj509.md";
  slug: "tustin-recruiting-enterprise-software-sales-carlsbad-tust1tj509";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-software-sales-glendale-tuste1w7bo.md": {
	id: "tustin-recruiting-enterprise-software-sales-glendale-tuste1w7bo.md";
  slug: "tustin-recruiting-enterprise-software-sales-glendale-tuste1w7bo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-software-sales-irvine-tustqo6mij.md": {
	id: "tustin-recruiting-enterprise-software-sales-irvine-tustqo6mij.md";
  slug: "tustin-recruiting-enterprise-software-sales-irvine-tustqo6mij";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-enterprise-software-sales-orange-tust5b6hrw.md": {
	id: "tustin-recruiting-enterprise-software-sales-orange-tust5b6hrw.md";
  slug: "tustin-recruiting-enterprise-software-sales-orange-tust5b6hrw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-alameda-tusteyxzht.md": {
	id: "tustin-recruiting-full-stack-developer-alameda-tusteyxzht.md";
  slug: "tustin-recruiting-full-stack-developer-alameda-tusteyxzht";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-eugene-tusta7m4a4.md": {
	id: "tustin-recruiting-full-stack-developer-eugene-tusta7m4a4.md";
  slug: "tustin-recruiting-full-stack-developer-eugene-tusta7m4a4";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-los-gatos-tustshnu7v.md": {
	id: "tustin-recruiting-full-stack-developer-los-gatos-tustshnu7v.md";
  slug: "tustin-recruiting-full-stack-developer-los-gatos-tustshnu7v";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-milpitas-tustcxce8w.md": {
	id: "tustin-recruiting-full-stack-developer-milpitas-tustcxce8w.md";
  slug: "tustin-recruiting-full-stack-developer-milpitas-tustcxce8w";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-newport-beach-tusttx96zn.md": {
	id: "tustin-recruiting-full-stack-developer-newport-beach-tusttx96zn.md";
  slug: "tustin-recruiting-full-stack-developer-newport-beach-tusttx96zn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-santa-clara-tustnfls1l.md": {
	id: "tustin-recruiting-full-stack-developer-santa-clara-tustnfls1l.md";
  slug: "tustin-recruiting-full-stack-developer-santa-clara-tustnfls1l";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-full-stack-developer-tualatin-tust862r82.md": {
	id: "tustin-recruiting-full-stack-developer-tualatin-tust862r82.md";
  slug: "tustin-recruiting-full-stack-developer-tualatin-tust862r82";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-burbank-tustco3ma1.md": {
	id: "tustin-recruiting-medical-device-sales-burbank-tustco3ma1.md";
  slug: "tustin-recruiting-medical-device-sales-burbank-tustco3ma1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-costa-mesa-tustpp8hxo.md": {
	id: "tustin-recruiting-medical-device-sales-costa-mesa-tustpp8hxo.md";
  slug: "tustin-recruiting-medical-device-sales-costa-mesa-tustpp8hxo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-garden-grove-tust9bn300.md": {
	id: "tustin-recruiting-medical-device-sales-garden-grove-tust9bn300.md";
  slug: "tustin-recruiting-medical-device-sales-garden-grove-tust9bn300";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-irvine-tust7sfbvb.md": {
	id: "tustin-recruiting-medical-device-sales-irvine-tust7sfbvb.md";
  slug: "tustin-recruiting-medical-device-sales-irvine-tust7sfbvb";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-norwalk-tustl9wn9i.md": {
	id: "tustin-recruiting-medical-device-sales-norwalk-tustl9wn9i.md";
  slug: "tustin-recruiting-medical-device-sales-norwalk-tustl9wn9i";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-bothell-tustuuorza.md": {
	id: "tustin-recruiting-medical-device-sales-representative-bothell-tustuuorza.md";
  slug: "tustin-recruiting-medical-device-sales-representative-bothell-tustuuorza";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-carlsbad-tustt67tmn.md": {
	id: "tustin-recruiting-medical-device-sales-representative-carlsbad-tustt67tmn.md";
  slug: "tustin-recruiting-medical-device-sales-representative-carlsbad-tustt67tmn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-costa-mesa-tustnwimfk.md": {
	id: "tustin-recruiting-medical-device-sales-representative-costa-mesa-tustnwimfk.md";
  slug: "tustin-recruiting-medical-device-sales-representative-costa-mesa-tustnwimfk";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-fremont-tust6tcfbr.md": {
	id: "tustin-recruiting-medical-device-sales-representative-fremont-tust6tcfbr.md";
  slug: "tustin-recruiting-medical-device-sales-representative-fremont-tust6tcfbr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-los-angeles-tustalmzhs.md": {
	id: "tustin-recruiting-medical-device-sales-representative-los-angeles-tustalmzhs.md";
  slug: "tustin-recruiting-medical-device-sales-representative-los-angeles-tustalmzhs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-playa-vista-tusti3bxqy.md": {
	id: "tustin-recruiting-medical-device-sales-representative-playa-vista-tusti3bxqy.md";
  slug: "tustin-recruiting-medical-device-sales-representative-playa-vista-tusti3bxqy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-santa-ana-tustz48azn.md": {
	id: "tustin-recruiting-medical-device-sales-representative-santa-ana-tustz48azn.md";
  slug: "tustin-recruiting-medical-device-sales-representative-santa-ana-tustz48azn";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-representative-vancouver-tustmlzx2c.md": {
	id: "tustin-recruiting-medical-device-sales-representative-vancouver-tustmlzx2c.md";
  slug: "tustin-recruiting-medical-device-sales-representative-vancouver-tustmlzx2c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-santa-ana-tustjb4ujx.md": {
	id: "tustin-recruiting-medical-device-sales-santa-ana-tustjb4ujx.md";
  slug: "tustin-recruiting-medical-device-sales-santa-ana-tustjb4ujx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-medical-device-sales-tustin-tustahsc39.md": {
	id: "tustin-recruiting-medical-device-sales-tustin-tustahsc39.md";
  slug: "tustin-recruiting-medical-device-sales-tustin-tustahsc39";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-product-manager-carson-tustswo72x.md": {
	id: "tustin-recruiting-product-manager-carson-tustswo72x.md";
  slug: "tustin-recruiting-product-manager-carson-tustswo72x";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-product-manager-chula-vista-tust1p5788.md": {
	id: "tustin-recruiting-product-manager-chula-vista-tust1p5788.md";
  slug: "tustin-recruiting-product-manager-chula-vista-tust1p5788";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-product-manager-costa-mesa-tustn4v9g9.md": {
	id: "tustin-recruiting-product-manager-costa-mesa-tustn4v9g9.md";
  slug: "tustin-recruiting-product-manager-costa-mesa-tustn4v9g9";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-product-manager-newport-beach-tustmhhurs.md": {
	id: "tustin-recruiting-product-manager-newport-beach-tustmhhurs.md";
  slug: "tustin-recruiting-product-manager-newport-beach-tustmhhurs";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-product-manager-westminster-tustx2mqbl.md": {
	id: "tustin-recruiting-product-manager-westminster-tustx2mqbl.md";
  slug: "tustin-recruiting-product-manager-westminster-tustx2mqbl";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-del-mar-tustblwne1.md": {
	id: "tustin-recruiting-regional-sales-manager-del-mar-tustblwne1.md";
  slug: "tustin-recruiting-regional-sales-manager-del-mar-tustblwne1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-el-segundo-tustz3qww1.md": {
	id: "tustin-recruiting-regional-sales-manager-el-segundo-tustz3qww1.md";
  slug: "tustin-recruiting-regional-sales-manager-el-segundo-tustz3qww1";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-garden-grove-tusthm41ef.md": {
	id: "tustin-recruiting-regional-sales-manager-garden-grove-tusthm41ef.md";
  slug: "tustin-recruiting-regional-sales-manager-garden-grove-tusthm41ef";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-hayward-tustmozlob.md": {
	id: "tustin-recruiting-regional-sales-manager-hayward-tustmozlob.md";
  slug: "tustin-recruiting-regional-sales-manager-hayward-tustmozlob";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-menlo-park-tusttirv9y.md": {
	id: "tustin-recruiting-regional-sales-manager-menlo-park-tusttirv9y.md";
  slug: "tustin-recruiting-regional-sales-manager-menlo-park-tusttirv9y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-pasadena-tust21pkme.md": {
	id: "tustin-recruiting-regional-sales-manager-pasadena-tust21pkme.md";
  slug: "tustin-recruiting-regional-sales-manager-pasadena-tust21pkme";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-regional-sales-manager-redondo-beach-tustobgu8h.md": {
	id: "tustin-recruiting-regional-sales-manager-redondo-beach-tustobgu8h.md";
  slug: "tustin-recruiting-regional-sales-manager-redondo-beach-tustobgu8h";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-beaverton-tust4zzyda.md": {
	id: "tustin-recruiting-saas-account-executive-beaverton-tust4zzyda.md";
  slug: "tustin-recruiting-saas-account-executive-beaverton-tust4zzyda";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-campbell-tust0tt8o0.md": {
	id: "tustin-recruiting-saas-account-executive-campbell-tust0tt8o0.md";
  slug: "tustin-recruiting-saas-account-executive-campbell-tust0tt8o0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-downey-tust9huftz.md": {
	id: "tustin-recruiting-saas-account-executive-downey-tust9huftz.md";
  slug: "tustin-recruiting-saas-account-executive-downey-tust9huftz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-foster-city-tustx3ak2y.md": {
	id: "tustin-recruiting-saas-account-executive-foster-city-tustx3ak2y.md";
  slug: "tustin-recruiting-saas-account-executive-foster-city-tustx3ak2y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-irvine-tust9cberi.md": {
	id: "tustin-recruiting-saas-account-executive-irvine-tust9cberi.md";
  slug: "tustin-recruiting-saas-account-executive-irvine-tust9cberi";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-long-beach-tustnewy7g.md": {
	id: "tustin-recruiting-saas-account-executive-long-beach-tustnewy7g.md";
  slug: "tustin-recruiting-saas-account-executive-long-beach-tustnewy7g";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-mercer-island-tusthb5wz6.md": {
	id: "tustin-recruiting-saas-account-executive-mercer-island-tusthb5wz6.md";
  slug: "tustin-recruiting-saas-account-executive-mercer-island-tusthb5wz6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-mission-viejo-tustxmpkhf.md": {
	id: "tustin-recruiting-saas-account-executive-mission-viejo-tustxmpkhf.md";
  slug: "tustin-recruiting-saas-account-executive-mission-viejo-tustxmpkhf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-san-diego-tustsum615.md": {
	id: "tustin-recruiting-saas-account-executive-san-diego-tustsum615.md";
  slug: "tustin-recruiting-saas-account-executive-san-diego-tustsum615";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-san-jose-tustj22np0.md": {
	id: "tustin-recruiting-saas-account-executive-san-jose-tustj22np0.md";
  slug: "tustin-recruiting-saas-account-executive-san-jose-tustj22np0";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-saas-account-executive-tigard-tustff4fjv.md": {
	id: "tustin-recruiting-saas-account-executive-tigard-tustff4fjv.md";
  slug: "tustin-recruiting-saas-account-executive-tigard-tustff4fjv";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-anaheim-tustoj6gch.md": {
	id: "tustin-recruiting-sales-development-representative-anaheim-tustoj6gch.md";
  slug: "tustin-recruiting-sales-development-representative-anaheim-tustoj6gch";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-culver-city-tust9d3c6u.md": {
	id: "tustin-recruiting-sales-development-representative-culver-city-tust9d3c6u.md";
  slug: "tustin-recruiting-sales-development-representative-culver-city-tust9d3c6u";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-redmond-tustqy9x36.md": {
	id: "tustin-recruiting-sales-development-representative-redmond-tustqy9x36.md";
  slug: "tustin-recruiting-sales-development-representative-redmond-tustqy9x36";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-salem-tust0tol64.md": {
	id: "tustin-recruiting-sales-development-representative-salem-tust0tol64.md";
  slug: "tustin-recruiting-sales-development-representative-salem-tust0tol64";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-sorrento-valley-tustaao1tw.md": {
	id: "tustin-recruiting-sales-development-representative-sorrento-valley-tustaao1tw.md";
  slug: "tustin-recruiting-sales-development-representative-sorrento-valley-tustaao1tw";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-torrance-tustdibvjz.md": {
	id: "tustin-recruiting-sales-development-representative-torrance-tustdibvjz.md";
  slug: "tustin-recruiting-sales-development-representative-torrance-tustdibvjz";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-sales-development-representative-walnut-creek-tust0pmea2.md": {
	id: "tustin-recruiting-sales-development-representative-walnut-creek-tust0pmea2.md";
  slug: "tustin-recruiting-sales-development-representative-walnut-creek-tust0pmea2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-senior-software-engineer-emeryville-tust8ntrn6.md": {
	id: "tustin-recruiting-senior-software-engineer-emeryville-tust8ntrn6.md";
  slug: "tustin-recruiting-senior-software-engineer-emeryville-tust8ntrn6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-senior-software-engineer-fullerton-tust8r8u4r.md": {
	id: "tustin-recruiting-senior-software-engineer-fullerton-tust8r8u4r.md";
  slug: "tustin-recruiting-senior-software-engineer-fullerton-tust8r8u4r";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-senior-software-engineer-mission-viejo-tustz9jt3c.md": {
	id: "tustin-recruiting-senior-software-engineer-mission-viejo-tustz9jt3c.md";
  slug: "tustin-recruiting-senior-software-engineer-mission-viejo-tustz9jt3c";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-software-engineer-orange-tust12fsb6.md": {
	id: "tustin-recruiting-software-engineer-orange-tust12fsb6.md";
  slug: "tustin-recruiting-software-engineer-orange-tust12fsb6";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-burlingame-tustfmkk67.md": {
	id: "tustin-recruiting-solutions-engineer-burlingame-tustfmkk67.md";
  slug: "tustin-recruiting-solutions-engineer-burlingame-tustfmkk67";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-lake-oswego-tusthxoplo.md": {
	id: "tustin-recruiting-solutions-engineer-lake-oswego-tusthxoplo.md";
  slug: "tustin-recruiting-solutions-engineer-lake-oswego-tusthxoplo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-newark-tustu6wd43.md": {
	id: "tustin-recruiting-solutions-engineer-newark-tustu6wd43.md";
  slug: "tustin-recruiting-solutions-engineer-newark-tustu6wd43";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-orange-tustlua3y2.md": {
	id: "tustin-recruiting-solutions-engineer-orange-tustlua3y2.md";
  slug: "tustin-recruiting-solutions-engineer-orange-tustlua3y2";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-south-san-francisco-tustn8pwsf.md": {
	id: "tustin-recruiting-solutions-engineer-south-san-francisco-tustn8pwsf.md";
  slug: "tustin-recruiting-solutions-engineer-south-san-francisco-tustn8pwsf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-solutions-engineer-tustin-tustl5kl52.md": {
	id: "tustin-recruiting-solutions-engineer-tustin-tustl5kl52.md";
  slug: "tustin-recruiting-solutions-engineer-tustin-tustl5kl52";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-buena-park-tustheniwm.md": {
	id: "tustin-recruiting-technical-sales-engineer-buena-park-tustheniwm.md";
  slug: "tustin-recruiting-technical-sales-engineer-buena-park-tustheniwm";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-fullerton-tustrok62y.md": {
	id: "tustin-recruiting-technical-sales-engineer-fullerton-tustrok62y.md";
  slug: "tustin-recruiting-technical-sales-engineer-fullerton-tustrok62y";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-poway-tustkdildo.md": {
	id: "tustin-recruiting-technical-sales-engineer-poway-tustkdildo.md";
  slug: "tustin-recruiting-technical-sales-engineer-poway-tustkdildo";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-santa-ana-tust5ksvbf.md": {
	id: "tustin-recruiting-technical-sales-engineer-santa-ana-tust5ksvbf.md";
  slug: "tustin-recruiting-technical-sales-engineer-santa-ana-tust5ksvbf";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-santa-clarita-tust9cxlpr.md": {
	id: "tustin-recruiting-technical-sales-engineer-santa-clarita-tust9cxlpr.md";
  slug: "tustin-recruiting-technical-sales-engineer-santa-clarita-tust9cxlpr";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-technical-sales-engineer-yorba-linda-tustk1044k.md": {
	id: "tustin-recruiting-technical-sales-engineer-yorba-linda-tustk1044k.md";
  slug: "tustin-recruiting-technical-sales-engineer-yorba-linda-tustk1044k";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-ux-designer-anaheim-tustplpqiy.md": {
	id: "tustin-recruiting-ux-designer-anaheim-tustplpqiy.md";
  slug: "tustin-recruiting-ux-designer-anaheim-tustplpqiy";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-ux-designer-imperial-beach-tusthuvfob.md": {
	id: "tustin-recruiting-ux-designer-imperial-beach-tusthuvfob.md";
  slug: "tustin-recruiting-ux-designer-imperial-beach-tusthuvfob";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-ux-designer-lake-forest-tust7xzmmx.md": {
	id: "tustin-recruiting-ux-designer-lake-forest-tust7xzmmx.md";
  slug: "tustin-recruiting-ux-designer-lake-forest-tust7xzmmx";
  body: string;
  collection: "jobs";
  data: InferEntrySchema<"jobs">
} & { render(): Render[".md"] };
"tustin-recruiting-ux-designer-long-beach-tust0v8vbm.md": {
	id: "tustin-recruiting-ux-designer-long-beach-tust0v8vbm.md";
  slug: "tustin-recruiting-ux-designer-long-beach-tust0v8vbm";
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
"recruiting": {
"california/index.md": {
	id: "california/index.md";
  slug: "california";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/artificial-intelligence-recruiting-in-irvine.md": {
	id: "california/irvine/artificial-intelligence-recruiting-in-irvine.md";
  slug: "california/irvine/artificial-intelligence-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/customer-success-recruiting-in-irvine.md": {
	id: "california/irvine/customer-success-recruiting-in-irvine.md";
  slug: "california/irvine/customer-success-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/cybersecurity-recruiting-in-irvine.md": {
	id: "california/irvine/cybersecurity-recruiting-in-irvine.md";
  slug: "california/irvine/cybersecurity-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/equipment-finance-recruiting-in-irvine.md": {
	id: "california/irvine/equipment-finance-recruiting-in-irvine.md";
  slug: "california/irvine/equipment-finance-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/index.md": {
	id: "california/irvine/index.md";
  slug: "california/irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/logistics-recruiting-in-irvine.md": {
	id: "california/irvine/logistics-recruiting-in-irvine.md";
  slug: "california/irvine/logistics-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/saas-recruiting-in-irvine.md": {
	id: "california/irvine/saas-recruiting-in-irvine.md";
  slug: "california/irvine/saas-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/sales-recruiting-in-irvine.md": {
	id: "california/irvine/sales-recruiting-in-irvine.md";
  slug: "california/irvine/sales-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/irvine/software-engineering-recruiting-in-irvine.md": {
	id: "california/irvine/software-engineering-recruiting-in-irvine.md";
  slug: "california/irvine/software-engineering-recruiting-in-irvine";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/artificial-intelligence-recruiting-in-long-beach.md": {
	id: "california/long-beach/artificial-intelligence-recruiting-in-long-beach.md";
  slug: "california/long-beach/artificial-intelligence-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/customer-success-recruiting-in-long-beach.md": {
	id: "california/long-beach/customer-success-recruiting-in-long-beach.md";
  slug: "california/long-beach/customer-success-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/cybersecurity-recruiting-in-long-beach.md": {
	id: "california/long-beach/cybersecurity-recruiting-in-long-beach.md";
  slug: "california/long-beach/cybersecurity-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/equipment-finance-recruiting-in-long-beach.md": {
	id: "california/long-beach/equipment-finance-recruiting-in-long-beach.md";
  slug: "california/long-beach/equipment-finance-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/index.md": {
	id: "california/long-beach/index.md";
  slug: "california/long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/logistics-recruiting-in-long-beach.md": {
	id: "california/long-beach/logistics-recruiting-in-long-beach.md";
  slug: "california/long-beach/logistics-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/saas-recruiting-in-long-beach.md": {
	id: "california/long-beach/saas-recruiting-in-long-beach.md";
  slug: "california/long-beach/saas-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/sales-recruiting-in-long-beach.md": {
	id: "california/long-beach/sales-recruiting-in-long-beach.md";
  slug: "california/long-beach/sales-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/long-beach/software-engineering-recruiting-in-long-beach.md": {
	id: "california/long-beach/software-engineering-recruiting-in-long-beach.md";
  slug: "california/long-beach/software-engineering-recruiting-in-long-beach";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/artificial-intelligence-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/artificial-intelligence-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/artificial-intelligence-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/customer-success-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/customer-success-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/customer-success-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/cybersecurity-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/cybersecurity-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/cybersecurity-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/equipment-finance-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/equipment-finance-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/equipment-finance-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/index.md": {
	id: "california/los-angeles/index.md";
  slug: "california/los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/logistics-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/logistics-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/logistics-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/saas-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/saas-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/saas-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/sales-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/sales-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/sales-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/los-angeles/software-engineering-recruiting-in-los-angeles.md": {
	id: "california/los-angeles/software-engineering-recruiting-in-los-angeles.md";
  slug: "california/los-angeles/software-engineering-recruiting-in-los-angeles";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/artificial-intelligence-recruiting-in-sacramento.md": {
	id: "california/sacramento/artificial-intelligence-recruiting-in-sacramento.md";
  slug: "california/sacramento/artificial-intelligence-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/customer-success-recruiting-in-sacramento.md": {
	id: "california/sacramento/customer-success-recruiting-in-sacramento.md";
  slug: "california/sacramento/customer-success-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/cybersecurity-recruiting-in-sacramento.md": {
	id: "california/sacramento/cybersecurity-recruiting-in-sacramento.md";
  slug: "california/sacramento/cybersecurity-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/equipment-finance-recruiting-in-sacramento.md": {
	id: "california/sacramento/equipment-finance-recruiting-in-sacramento.md";
  slug: "california/sacramento/equipment-finance-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/index.md": {
	id: "california/sacramento/index.md";
  slug: "california/sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/logistics-recruiting-in-sacramento.md": {
	id: "california/sacramento/logistics-recruiting-in-sacramento.md";
  slug: "california/sacramento/logistics-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/saas-recruiting-in-sacramento.md": {
	id: "california/sacramento/saas-recruiting-in-sacramento.md";
  slug: "california/sacramento/saas-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/sales-recruiting-in-sacramento.md": {
	id: "california/sacramento/sales-recruiting-in-sacramento.md";
  slug: "california/sacramento/sales-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/sacramento/software-engineering-recruiting-in-sacramento.md": {
	id: "california/sacramento/software-engineering-recruiting-in-sacramento.md";
  slug: "california/sacramento/software-engineering-recruiting-in-sacramento";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/artificial-intelligence-recruiting-in-san-diego.md": {
	id: "california/san-diego/artificial-intelligence-recruiting-in-san-diego.md";
  slug: "california/san-diego/artificial-intelligence-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/customer-success-recruiting-in-san-diego.md": {
	id: "california/san-diego/customer-success-recruiting-in-san-diego.md";
  slug: "california/san-diego/customer-success-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/cybersecurity-recruiting-in-san-diego.md": {
	id: "california/san-diego/cybersecurity-recruiting-in-san-diego.md";
  slug: "california/san-diego/cybersecurity-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/equipment-finance-recruiting-in-san-diego.md": {
	id: "california/san-diego/equipment-finance-recruiting-in-san-diego.md";
  slug: "california/san-diego/equipment-finance-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/index.md": {
	id: "california/san-diego/index.md";
  slug: "california/san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/logistics-recruiting-in-san-diego.md": {
	id: "california/san-diego/logistics-recruiting-in-san-diego.md";
  slug: "california/san-diego/logistics-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/saas-recruiting-in-san-diego.md": {
	id: "california/san-diego/saas-recruiting-in-san-diego.md";
  slug: "california/san-diego/saas-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/sales-recruiting-in-san-diego.md": {
	id: "california/san-diego/sales-recruiting-in-san-diego.md";
  slug: "california/san-diego/sales-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-diego/software-engineering-recruiting-in-san-diego.md": {
	id: "california/san-diego/software-engineering-recruiting-in-san-diego.md";
  slug: "california/san-diego/software-engineering-recruiting-in-san-diego";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/artificial-intelligence-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/artificial-intelligence-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/artificial-intelligence-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/customer-success-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/customer-success-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/customer-success-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/cybersecurity-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/cybersecurity-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/cybersecurity-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/equipment-finance-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/equipment-finance-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/equipment-finance-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/index.md": {
	id: "california/san-francisco/index.md";
  slug: "california/san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/logistics-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/logistics-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/logistics-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/saas-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/saas-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/saas-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/sales-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/sales-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/sales-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-francisco/software-engineering-recruiting-in-san-francisco.md": {
	id: "california/san-francisco/software-engineering-recruiting-in-san-francisco.md";
  slug: "california/san-francisco/software-engineering-recruiting-in-san-francisco";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/artificial-intelligence-recruiting-in-san-jose.md": {
	id: "california/san-jose/artificial-intelligence-recruiting-in-san-jose.md";
  slug: "california/san-jose/artificial-intelligence-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/customer-success-recruiting-in-san-jose.md": {
	id: "california/san-jose/customer-success-recruiting-in-san-jose.md";
  slug: "california/san-jose/customer-success-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/cybersecurity-recruiting-in-san-jose.md": {
	id: "california/san-jose/cybersecurity-recruiting-in-san-jose.md";
  slug: "california/san-jose/cybersecurity-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/equipment-finance-recruiting-in-san-jose.md": {
	id: "california/san-jose/equipment-finance-recruiting-in-san-jose.md";
  slug: "california/san-jose/equipment-finance-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/index.md": {
	id: "california/san-jose/index.md";
  slug: "california/san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/logistics-recruiting-in-san-jose.md": {
	id: "california/san-jose/logistics-recruiting-in-san-jose.md";
  slug: "california/san-jose/logistics-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/saas-recruiting-in-san-jose.md": {
	id: "california/san-jose/saas-recruiting-in-san-jose.md";
  slug: "california/san-jose/saas-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/sales-recruiting-in-san-jose.md": {
	id: "california/san-jose/sales-recruiting-in-san-jose.md";
  slug: "california/san-jose/sales-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-jose/software-engineering-recruiting-in-san-jose.md": {
	id: "california/san-jose/software-engineering-recruiting-in-san-jose.md";
  slug: "california/san-jose/software-engineering-recruiting-in-san-jose";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/artificial-intelligence-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/artificial-intelligence-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/artificial-intelligence-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/customer-success-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/customer-success-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/customer-success-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/cybersecurity-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/cybersecurity-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/cybersecurity-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/equipment-finance-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/equipment-finance-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/equipment-finance-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/index.md": {
	id: "california/san-ramon/index.md";
  slug: "california/san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/logistics-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/logistics-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/logistics-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/saas-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/saas-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/saas-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/sales-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/sales-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/sales-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"california/san-ramon/software-engineering-recruiting-in-san-ramon.md": {
	id: "california/san-ramon/software-engineering-recruiting-in-san-ramon.md";
  slug: "california/san-ramon/software-engineering-recruiting-in-san-ramon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/artificial-intelligence-recruiting-in-denver.md": {
	id: "colorado/denver/artificial-intelligence-recruiting-in-denver.md";
  slug: "colorado/denver/artificial-intelligence-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/customer-success-recruiting-in-denver.md": {
	id: "colorado/denver/customer-success-recruiting-in-denver.md";
  slug: "colorado/denver/customer-success-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/cybersecurity-recruiting-in-denver.md": {
	id: "colorado/denver/cybersecurity-recruiting-in-denver.md";
  slug: "colorado/denver/cybersecurity-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/equipment-finance-recruiting-in-denver.md": {
	id: "colorado/denver/equipment-finance-recruiting-in-denver.md";
  slug: "colorado/denver/equipment-finance-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/index.md": {
	id: "colorado/denver/index.md";
  slug: "colorado/denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/logistics-recruiting-in-denver.md": {
	id: "colorado/denver/logistics-recruiting-in-denver.md";
  slug: "colorado/denver/logistics-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/saas-recruiting-in-denver.md": {
	id: "colorado/denver/saas-recruiting-in-denver.md";
  slug: "colorado/denver/saas-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/sales-recruiting-in-denver.md": {
	id: "colorado/denver/sales-recruiting-in-denver.md";
  slug: "colorado/denver/sales-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/denver/software-engineering-recruiting-in-denver.md": {
	id: "colorado/denver/software-engineering-recruiting-in-denver.md";
  slug: "colorado/denver/software-engineering-recruiting-in-denver";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"colorado/index.md": {
	id: "colorado/index.md";
  slug: "colorado";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/index.md": {
	id: "oregon/index.md";
  slug: "oregon";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/artificial-intelligence-recruiting-in-portland.md": {
	id: "oregon/portland/artificial-intelligence-recruiting-in-portland.md";
  slug: "oregon/portland/artificial-intelligence-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/customer-success-recruiting-in-portland.md": {
	id: "oregon/portland/customer-success-recruiting-in-portland.md";
  slug: "oregon/portland/customer-success-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/cybersecurity-recruiting-in-portland.md": {
	id: "oregon/portland/cybersecurity-recruiting-in-portland.md";
  slug: "oregon/portland/cybersecurity-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/equipment-finance-recruiting-in-portland.md": {
	id: "oregon/portland/equipment-finance-recruiting-in-portland.md";
  slug: "oregon/portland/equipment-finance-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/index.md": {
	id: "oregon/portland/index.md";
  slug: "oregon/portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/logistics-recruiting-in-portland.md": {
	id: "oregon/portland/logistics-recruiting-in-portland.md";
  slug: "oregon/portland/logistics-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/saas-recruiting-in-portland.md": {
	id: "oregon/portland/saas-recruiting-in-portland.md";
  slug: "oregon/portland/saas-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/sales-recruiting-in-portland.md": {
	id: "oregon/portland/sales-recruiting-in-portland.md";
  slug: "oregon/portland/sales-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"oregon/portland/software-engineering-recruiting-in-portland.md": {
	id: "oregon/portland/software-engineering-recruiting-in-portland.md";
  slug: "oregon/portland/software-engineering-recruiting-in-portland";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/artificial-intelligence-recruiting-in-austin.md": {
	id: "texas/austin/artificial-intelligence-recruiting-in-austin.md";
  slug: "texas/austin/artificial-intelligence-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/customer-success-recruiting-in-austin.md": {
	id: "texas/austin/customer-success-recruiting-in-austin.md";
  slug: "texas/austin/customer-success-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/cybersecurity-recruiting-in-austin.md": {
	id: "texas/austin/cybersecurity-recruiting-in-austin.md";
  slug: "texas/austin/cybersecurity-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/equipment-finance-recruiting-in-austin.md": {
	id: "texas/austin/equipment-finance-recruiting-in-austin.md";
  slug: "texas/austin/equipment-finance-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/index.md": {
	id: "texas/austin/index.md";
  slug: "texas/austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/logistics-recruiting-in-austin.md": {
	id: "texas/austin/logistics-recruiting-in-austin.md";
  slug: "texas/austin/logistics-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/saas-recruiting-in-austin.md": {
	id: "texas/austin/saas-recruiting-in-austin.md";
  slug: "texas/austin/saas-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/sales-recruiting-in-austin.md": {
	id: "texas/austin/sales-recruiting-in-austin.md";
  slug: "texas/austin/sales-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/austin/software-engineering-recruiting-in-austin.md": {
	id: "texas/austin/software-engineering-recruiting-in-austin.md";
  slug: "texas/austin/software-engineering-recruiting-in-austin";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/artificial-intelligence-recruiting-in-dallas.md": {
	id: "texas/dallas/artificial-intelligence-recruiting-in-dallas.md";
  slug: "texas/dallas/artificial-intelligence-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/customer-success-recruiting-in-dallas.md": {
	id: "texas/dallas/customer-success-recruiting-in-dallas.md";
  slug: "texas/dallas/customer-success-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/cybersecurity-recruiting-in-dallas.md": {
	id: "texas/dallas/cybersecurity-recruiting-in-dallas.md";
  slug: "texas/dallas/cybersecurity-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/equipment-finance-recruiting-in-dallas.md": {
	id: "texas/dallas/equipment-finance-recruiting-in-dallas.md";
  slug: "texas/dallas/equipment-finance-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/index.md": {
	id: "texas/dallas/index.md";
  slug: "texas/dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/logistics-recruiting-in-dallas.md": {
	id: "texas/dallas/logistics-recruiting-in-dallas.md";
  slug: "texas/dallas/logistics-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/saas-recruiting-in-dallas.md": {
	id: "texas/dallas/saas-recruiting-in-dallas.md";
  slug: "texas/dallas/saas-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/sales-recruiting-in-dallas.md": {
	id: "texas/dallas/sales-recruiting-in-dallas.md";
  slug: "texas/dallas/sales-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/dallas/software-engineering-recruiting-in-dallas.md": {
	id: "texas/dallas/software-engineering-recruiting-in-dallas.md";
  slug: "texas/dallas/software-engineering-recruiting-in-dallas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/artificial-intelligence-recruiting-in-houston.md": {
	id: "texas/houston/artificial-intelligence-recruiting-in-houston.md";
  slug: "texas/houston/artificial-intelligence-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/customer-success-recruiting-in-houston.md": {
	id: "texas/houston/customer-success-recruiting-in-houston.md";
  slug: "texas/houston/customer-success-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/cybersecurity-recruiting-in-houston.md": {
	id: "texas/houston/cybersecurity-recruiting-in-houston.md";
  slug: "texas/houston/cybersecurity-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/equipment-finance-recruiting-in-houston.md": {
	id: "texas/houston/equipment-finance-recruiting-in-houston.md";
  slug: "texas/houston/equipment-finance-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/index.md": {
	id: "texas/houston/index.md";
  slug: "texas/houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/logistics-recruiting-in-houston.md": {
	id: "texas/houston/logistics-recruiting-in-houston.md";
  slug: "texas/houston/logistics-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/saas-recruiting-in-houston.md": {
	id: "texas/houston/saas-recruiting-in-houston.md";
  slug: "texas/houston/saas-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/sales-recruiting-in-houston.md": {
	id: "texas/houston/sales-recruiting-in-houston.md";
  slug: "texas/houston/sales-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/houston/software-engineering-recruiting-in-houston.md": {
	id: "texas/houston/software-engineering-recruiting-in-houston.md";
  slug: "texas/houston/software-engineering-recruiting-in-houston";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/index.md": {
	id: "texas/index.md";
  slug: "texas";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/artificial-intelligence-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/artificial-intelligence-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/artificial-intelligence-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/customer-success-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/customer-success-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/customer-success-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/cybersecurity-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/cybersecurity-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/cybersecurity-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/equipment-finance-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/equipment-finance-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/equipment-finance-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/index.md": {
	id: "texas/san-antonio/index.md";
  slug: "texas/san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/logistics-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/logistics-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/logistics-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/saas-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/saas-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/saas-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/sales-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/sales-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/sales-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"texas/san-antonio/software-engineering-recruiting-in-san-antonio.md": {
	id: "texas/san-antonio/software-engineering-recruiting-in-san-antonio.md";
  slug: "texas/san-antonio/software-engineering-recruiting-in-san-antonio";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/index.md": {
	id: "washington/index.md";
  slug: "washington";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/artificial-intelligence-recruiting-in-seattle.md": {
	id: "washington/seattle/artificial-intelligence-recruiting-in-seattle.md";
  slug: "washington/seattle/artificial-intelligence-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/customer-success-recruiting-in-seattle.md": {
	id: "washington/seattle/customer-success-recruiting-in-seattle.md";
  slug: "washington/seattle/customer-success-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/cybersecurity-recruiting-in-seattle.md": {
	id: "washington/seattle/cybersecurity-recruiting-in-seattle.md";
  slug: "washington/seattle/cybersecurity-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/equipment-finance-recruiting-in-seattle.md": {
	id: "washington/seattle/equipment-finance-recruiting-in-seattle.md";
  slug: "washington/seattle/equipment-finance-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/index.md": {
	id: "washington/seattle/index.md";
  slug: "washington/seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/logistics-recruiting-in-seattle.md": {
	id: "washington/seattle/logistics-recruiting-in-seattle.md";
  slug: "washington/seattle/logistics-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/saas-recruiting-in-seattle.md": {
	id: "washington/seattle/saas-recruiting-in-seattle.md";
  slug: "washington/seattle/saas-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/sales-recruiting-in-seattle.md": {
	id: "washington/seattle/sales-recruiting-in-seattle.md";
  slug: "washington/seattle/sales-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
"washington/seattle/software-engineering-recruiting-in-seattle.md": {
	id: "washington/seattle/software-engineering-recruiting-in-seattle.md";
  slug: "washington/seattle/software-engineering-recruiting-in-seattle";
  body: string;
  collection: "recruiting";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
