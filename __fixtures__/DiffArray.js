const diffArray = [
  {
    name: 'common',
    type: 'branch',
    status: 'unchanged',
    valueOld: [
      {
        name: 'follow',
        type: 'node',
        status: 'added',
        valueNew: false,
      },
      {
        name: 'setting1',
        type: 'node',
        status: 'unchanged',
        valueOld: 'Value 1',
      },
      {
        name: 'setting2',
        type: 'node',
        status: 'removed',
        valueOld: 200,
      },
      {
        name: 'setting3',
        type: 'node',
        typeNew: 'node',
        status: 'updated',
        valueOld: true,
        valueNew: null,
      },
      {
        name: 'setting4',
        type: 'node',
        status: 'added',
        valueNew: 'blah blah',
      },
      {
        name: 'setting5',
        type: 'branch',
        status: 'added',
        valueNew: [
          {
            name: 'key5',
            type: 'node',
            status: 'unchanged',
            valueOld: 'value5',
          },
        ],
      },
      {
        name: 'setting6',
        type: 'branch',
        status: 'unchanged',
        valueOld: [
          {
            name: 'doge',
            type: 'branch',
            status: 'unchanged',
            valueOld: [
              {
                name: 'wow',
                type: 'node',
                typeNew: 'node',
                status: 'updated',
                valueOld: '',
                valueNew: 'so much',
              },
            ],
          },
          {
            name: 'key',
            type: 'node',
            status: 'unchanged',
            valueOld: 'value',
          },
          {
            name: 'ops',
            type: 'node',
            status: 'added',
            valueNew: 'vops',
          },
        ],
      },
    ],
  },
  {
    name: 'group1',
    type: 'branch',
    status: 'unchanged',
    valueOld: [
      {
        name: 'baz',
        type: 'node',
        typeNew: 'node',
        status: 'updated',
        valueOld: 'bas',
        valueNew: 'bars',
      },
      {
        name: 'foo',
        type: 'node',
        status: 'unchanged',
        valueOld: 'bar',
      },
      {
        name: 'nest',
        type: 'branch',
        typeNew: 'node',
        status: 'updated',
        valueOld: [
          {
            name: 'key',
            type: 'node',
            status: 'unchanged',
            valueOld: 'value',
          },
        ],
        valueNew: 'str',
      },
    ],
  },
  {
    name: 'group2',
    type: 'branch',
    status: 'removed',
    valueOld: [
      {
        name: 'abc',
        type: 'node',
        status: 'unchanged',
        valueOld: 12345,
      },
      {
        name: 'deep',
        type: 'node',
        status: 'unchanged',
        valueOld: [
          {
            name: 'id',
            type: 'node',
            status: 'unchanged',
            valueOld: 45,
          },
        ],
      },
    ],
  },
  {
    name: 'group3',
    type: 'branch',
    status: 'added',
    valueNew: [
      {
        name: 'deep',
        type: 'node',
        status: 'unchanged',
        valueOld: [
          {
            name: 'id',
            type: 'node',
            status: 'unchanged',
            valueOld: [
              {
                name: 'number',
                type: 'node',
                status: 'unchanged',
                valueOld: 45,
              },
            ],
          },
        ],
      },
      {
        name: 'fee',
        type: 'node',
        status: 'unchanged',
        valueOld: 100500,
      },
    ],
  },
];

export default diffArray;
