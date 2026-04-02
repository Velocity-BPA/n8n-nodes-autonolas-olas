/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { AutonolasOlas } from '../nodes/Autonolas/Olas/Autonolas/Olas.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('AutonolasOlas Node', () => {
  let node: AutonolasOlas;

  beforeAll(() => {
    node = new AutonolasOlas();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Autonolas/Olas');
      expect(node.description.name).toBe('autonolasolas');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('AgentService Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.autonolas.network/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get all agent services', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce('active')
      .mockReturnValueOnce('0x123');

    const mockResponse = { services: [{ id: '1', name: 'Test Service' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAgentServiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
  });

  it('should get specific agent service', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('service123')
      .mockReturnValueOnce(true);

    const mockResponse = { id: 'service123', name: 'Test Service', metadata: {} };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAgentServiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
  });

  it('should create agent service', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('New Service')
      .mockReturnValueOnce('Service description')
      .mockReturnValueOnce('{"key": "value"}')
      .mockReturnValueOnce(1);

    const mockResponse = { id: 'new123', name: 'New Service', status: 'deploying' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAgentServiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeAgentServiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'API Error' },
      pairedItem: { item: 0 },
    }]);
  });
});

describe('MechTool Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://api.autonolas.network/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getAll operation', () => {
    it('should retrieve all Mech tools successfully', async () => {
      const mockResponse = { tools: [{ id: '1', name: 'Test Tool' }] };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getAll')
        .mockReturnValueOnce('')
        .mockReturnValueOnce('1')
        .mockReturnValueOnce(false);

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });

    it('should handle errors in getAll operation', async () => {
      const errorMessage = 'API Error';
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error(errorMessage));
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json.error).toBe(errorMessage);
    });
  });

  describe('get operation', () => {
    it('should retrieve a specific Mech tool successfully', async () => {
      const mockResponse = { id: '1', name: 'Test Tool' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('get')
        .mockReturnValueOnce('tool-123')
        .mockReturnValueOnce(true);

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('create operation', () => {
    it('should create a new Mech tool successfully', async () => {
      const mockResponse = { id: '1', name: 'New Tool' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('create')
        .mockReturnValueOnce('New Tool')
        .mockReturnValueOnce('Tool description')
        .mockReturnValueOnce('console.log("hello")')
        .mockReturnValueOnce({ category: 'test' });

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('execute operation', () => {
    it('should execute a Mech tool successfully', async () => {
      const mockResponse = { result: 'execution result' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('execute')
        .mockReturnValueOnce('tool-123')
        .mockReturnValueOnce({ input: 'test data' })
        .mockReturnValueOnce('1');

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('delete operation', () => {
    it('should delete a Mech tool successfully', async () => {
      const mockResponse = { success: true };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('delete')
        .mockReturnValueOnce('tool-123');

      const result = await executeMechToolOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });
});

describe('StakingPool Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://api.autonolas.network/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  it('should get all staking pools successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce('1')
      .mockReturnValueOnce('active')
      .mockReturnValueOnce(5);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
      { id: 'pool1', name: 'Test Pool 1', status: 'active' },
      { id: 'pool2', name: 'Test Pool 2', status: 'active' }
    ]);

    const result = await executeStakingPoolOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toHaveLength(2);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.autonolas.network/v1/staking/pools?chain_id=1&status=active&min_apr=5',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get staking pool by ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('pool123')
      .mockReturnValueOnce(true);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'pool123',
      name: 'Test Pool',
      rewards: { total: '1000' }
    });

    const result = await executeStakingPoolOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('pool123');
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.autonolas.network/v1/staking/pools/pool123?include_rewards=true',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should create staking pool successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('New Pool')
      .mockReturnValueOnce('{"apr": 10}')
      .mockReturnValueOnce('1')
      .mockReturnValueOnce('1000');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'newpool123',
      name: 'New Pool',
      status: 'active'
    });

    const result = await executeStakingPoolOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('newpool123');
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.autonolas.network/v1/staking/pools',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'New Pool',
        config: { apr: 10 },
        chain_id: '1',
        initial_stake: '1000',
      },
      json: true,
    });
  });

  it('should stake tokens successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('stake')
      .mockReturnValueOnce('pool123')
      .mockReturnValueOnce('500')
      .mockReturnValueOnce(30);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      success: true,
      txHash: '0x123...'
    });

    const result = await executeStakingPoolOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.success).toBe(true);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.autonolas.network/v1/staking/pools/pool123/stake',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: {
        amount: '500',
        duration: 30,
      },
      json: true,
    });
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('nonexistent');

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
      new Error('Pool not found')
    );
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeStakingPoolOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Pool not found');
  });

  it('should throw error for unknown operation', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknown');

    await expect(
      executeStakingPoolOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Unknown operation: unknown');
  });
});

describe('MultiChainOperation Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.autonolas.network/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAll operation', () => {
		it('should get all chains successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce(false);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				chains: [{ id: 1, name: 'Ethereum' }],
			});

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json).toEqual({ chains: [{ id: 1, name: 'Ethereum' }] });
		});

		it('should handle errors in getAll operation', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce(false);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('bridge operation', () => {
		it('should bridge assets successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('bridge')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('137')
				.mockReturnValueOnce('100')
				.mockReturnValueOnce('OLAS');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				transaction_hash: '0x123',
			});

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json).toEqual({ transaction_hash: '0x123' });
		});

		it('should handle errors in bridge operation', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('bridge')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('137')
				.mockReturnValueOnce('100')
				.mockReturnValueOnce('OLAS');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Bridge failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json.error).toBe('Bridge failed');
		});
	});

	describe('deploy operation', () => {
		it('should deploy contract successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deploy')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce({ bytecode: '0x123' })
				.mockReturnValueOnce(500000);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				contract_address: '0xabc123',
			});

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json).toEqual({ contract_address: '0xabc123' });
		});

		it('should handle errors in deploy operation', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deploy')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce({ bytecode: '0x123' })
				.mockReturnValueOnce(500000);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Deploy failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeMultiChainOperationOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json.error).toBe('Deploy failed');
		});
	});
});

describe('Governance Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.autonolas.network/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getAll operation', () => {
		it('should get all governance proposals successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('active')
				.mockReturnValueOnce('0x123')
				.mockReturnValueOnce(1000);

			const mockResponse = {
				proposals: [
					{ id: '1', title: 'Test Proposal', status: 'active' },
					{ id: '2', title: 'Another Proposal', status: 'active' }
				]
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 }
			}]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: expect.stringContaining('/governance/proposals'),
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle getAll errors', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce('1');
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: { error: 'API Error' },
				pairedItem: { item: 0 }
			}]);
		});
	});

	describe('get operation', () => {
		it('should get proposal details successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('get')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('proposal-123')
				.mockReturnValueOnce(true);

			const mockResponse = {
				id: 'proposal-123',
				title: 'Test Proposal',
				description: 'Test Description',
				votes: []
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 }
			}]);
		});
	});

	describe('create operation', () => {
		it('should create governance proposal successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('create')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('Test Proposal')
				.mockReturnValueOnce('Test Description')
				.mockReturnValueOnce('[{"target": "0x123", "value": "0", "data": "0x"}]')
				.mockReturnValueOnce(86400);

			const mockResponse = {
				id: 'new-proposal-123',
				title: 'Test Proposal',
				status: 'pending'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 }
			}]);
		});
	});

	describe('vote operation', () => {
		it('should vote on proposal successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('vote')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('proposal-123')
				.mockReturnValueOnce('for')
				.mockReturnValueOnce(1000);

			const mockResponse = {
				proposal_id: 'proposal-123',
				vote_choice: 'for',
				voting_power: 1000,
				transaction_hash: '0xabc123'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 }
			}]);
		});
	});

	describe('execute operation', () => {
		it('should execute proposal successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('execute')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('proposal-123');

			const mockResponse = {
				proposal_id: 'proposal-123',
				execution_status: 'success',
				transaction_hash: '0xdef456'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeGovernanceOperations.call(
				mockExecuteFunctions,
				[{ json: {} }]
			);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 }
			}]);
		});
	});
});
});
