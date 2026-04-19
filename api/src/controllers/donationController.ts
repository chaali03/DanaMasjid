import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { blockchainService } from '../utils/blockchainService';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { jumlah, nama, email, masjidId, programId, pesan, anonim } = req.body;

    const donasi = await prisma.donasi.create({
      data: {
        jumlah,
        nama,
        email,
        masjidId,
        programId,
        pesan,
        anonim,
        status: 'pending'
      }
    });

    res.status(201).json({
      status: 'success',
      data: { donasi }
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const confirmDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const donasi = await prisma.donasi.update({
      where: { id },
      data: { status: 'success' },
      include: { program: true }
    });

    // Record on Blockchain
    try {
      const purpose = donasi.program?.nama || 'General Donation';
      await blockchainService.recordDonation(
        donasi.id,
        donasi.jumlah.toString(),
        purpose
      );
      console.log(`Donation ${donasi.id} recorded on blockchain`);
    } catch (bcError) {
      console.error('Blockchain error:', bcError);
      // We don't fail the request if blockchain recording fails, but we should log it
    }

    // Update program terkumpul
    if (donasi.programId) {
      await prisma.program.update({
        where: { id: donasi.programId },
        data: {
          terkumpul: {
            increment: donasi.jumlah
          }
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: { donasi }
    });
  } catch (error) {
    console.error('Error confirming donation:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getDonationBlockchainData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await blockchainService.getDonation(id);
    
    res.status(200).json({
      status: 'success',
      data: {
        donationId: data.donationId,
        donor: data.donor,
        amount: data.amount.toString(),
        purpose: data.purpose,
        timestamp: Number(data.timestamp),
        isUsed: data.isUsed
      }
    });
  } catch (error) {
    console.error('Error fetching blockchain data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
