import { Request, Response } from 'express';
import { blockchainService } from '../utils/blockchainService';

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description, quantity } = req.body;
    const tx = await blockchainService.createItem(name, description, quantity);
    
    res.status(201).json({
      status: 'success',
      data: {
        transactionHash: tx.hash,
        message: 'Item created on blockchain'
      }
    });
  } catch (error) {
    console.error('Error creating supply chain item:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const updateItemStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const tx = await blockchainService.updateItemStatus(Number(id), Number(status));
    
    res.status(200).json({
      status: 'success',
      data: {
        transactionHash: tx.hash,
        message: 'Item status updated on blockchain'
      }
    });
  } catch (error) {
    console.error('Error updating supply chain item status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await blockchainService.getItem(Number(id));
    
    res.status(200).json({
      status: 'success',
      data: {
        id: Number(data.id),
        name: data.name,
        description: data.description,
        quantity: Number(data.quantity),
        status: Number(data.status),
        currentOwner: data.currentOwner,
        timestamp: Number(data.timestamp)
      }
    });
  } catch (error) {
    console.error('Error fetching supply chain item:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
