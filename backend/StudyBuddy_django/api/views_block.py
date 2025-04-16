from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Block
from .serializer import BlockSerializer

# GET all block records
@api_view(['GET'])
def get_blocks(request):
    blocks = Block.objects.all()
    serializer = BlockSerializer(blocks, many=True)
    return Response(serializer.data)

# GET a specific block record by ID
@api_view(['GET'])
def get_block(request, block_id):
    try:
        block = Block.objects.get(block_id=block_id)
        serializer = BlockSerializer(block)
        return Response(serializer.data)
    except Block.DoesNotExist:
        return Response({'detail': 'Block not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE a new block record
@api_view(['POST'])
def create_block(request):
    serializer = BlockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE a block record
@api_view(['PUT'])
def update_block(request, block_id):
    try:
        block = Block.objects.get(block_id=block_id)
    except Block.DoesNotExist:
        return Response({'detail': 'Block not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BlockSerializer(block, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a block record
@api_view(['DELETE'])
def delete_block(request, block_id):
    try:
        block = Block.objects.get(block_id=block_id)
        block.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Block.DoesNotExist:
        return Response({'detail': 'Block not found'}, status=status.HTTP_404_NOT_FOUND)