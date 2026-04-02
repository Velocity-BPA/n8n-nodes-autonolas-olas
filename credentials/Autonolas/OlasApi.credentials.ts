import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AutonolasOlasApi implements ICredentialType {
	name = 'autonolasOlasApi';
	displayName = 'Autonolas/Olas API';
	documentationUrl = 'https://docs.autonolas.network/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for Autonolas/Olas API authentication. Obtain from the Autonolas developer portal.',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.autonolas.network/v1',
			required: true,
			description: 'The base URL for the Autonolas/Olas API',
		},
	];
}