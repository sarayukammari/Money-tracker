const Transaction = require('../models/Transactions');


exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        console.log('Error: '.red.bold, error);
        res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}


exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transactions = await Transaction.create({ text: text, amount: amount });
        return res.status(200).json({
            success: true,
            data: transactions
        })
    } catch (error) {
        console.log('Error: '.red.bold, error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.log('Error: '.red.bold, error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}