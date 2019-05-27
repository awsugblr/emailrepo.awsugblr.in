import boto3

dynamodb = boto3.resource('dynamodb')

dynamodb.create_table(
	TableName='Users',
	KeySchema=[
		{
			'AttributeName': 'email_address',
			'KeyType': 'HASH' 
		},
		{
			'AttributeName': 'full_name',
			'KeyType': 'RANGE'
		}
	],
	AttributeDefinitions=[
		{
			'AttributeName': 'email_address',
			'AttributeType': 'S'
		},
		{
			'AttributeName': 'full_name',
			'AttributeType': 'S'
		}
	]
)

# Wait until the table exists.
table.meta.client.get_waiter('table_exists').wait(TableName='Users')

print(table.creation_date_time)
