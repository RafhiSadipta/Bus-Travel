const { createTransaksi, getAllTransaksi, updateTransaksiStatus, getUserTransactionsFromDB, getTransaksiById } = require('../models/transaksiModel');
const { updateKursiStatus } = require('../models/kursiModel'); // Import updateKursiStatus from kursi model

// Handle the creation of a new transaction
const createTransaksiHandler = async (req, res) => {
    const { id_tiket, id_kursi, id_user, metode_transaksi } = req.body;

    try {
        // Create a new transaction with the provided details and set the initial status to 'pending'
        const newTransaksi = await createTransaksi({
            id_tiket,
            id_kursi,
            id_user,
            metode_transaksi,
            status: 'pending' // Set initial status as 'pending'
        });

        // Update the seat status to 'not available' (false) after booking
        await updateKursiStatus(id_kursi, false);

        res.status(201).json({ message: 'Transaksi berhasil dibuat', transaksi: newTransaksi });
    } catch (error) {
        console.error("Error creating transaksi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTransaksiHandler = async (req, res) => {
    try {
        const transaksi = await getAllTransaksi();
        console.log("Transaksi data:", transaksi);  // Log to see what is fetched
        res.status(200).json(transaksi);
    } catch (error) {
        console.error("Error fetching transaksi:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTransaksiStatusHandler = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Update the transaction status
        await updateTransaksiStatus(id, status);

        // Retrieve transaction details to get the seat ID
        const transaksi = await getTransaksiById(id);
        if (transaksi && transaksi.id_kursi) {
            // If the transaction is approved, set seat to unavailable (false)
            if (status === 'acc') {
                await updateKursiStatus(transaksi.id_kursi, false); // Set seat to unavailable
            }
            // If the transaction is rejected, set seat back to available (true)
            else if (status === 'rejected') {
                await updateKursiStatus(transaksi.id_kursi, true); // Set seat to available
            }
        }

        res.status(200).json({ message: 'Status transaksi berhasil diperbarui' });
    } catch (error) {
        console.error("Error updating transaksi status:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserTransactions = async (req, res) => {
    const userId = req.params.id;

    try {
        const transactions = await getUserTransactionsFromDB(userId);
        if (transactions.length > 0) {
            res.status(200).json(transactions);
        } else {
            res.status(404).json({ message: 'No transactions found for this user' });
        }
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTransaksiHandler,
    getAllTransaksiHandler,
    updateTransaksiStatusHandler,
    getUserTransactions,
};
