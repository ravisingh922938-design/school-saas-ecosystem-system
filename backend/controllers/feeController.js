const FeeRecord = require('../models/FeeRecord');
const Student = require('../models/Student');

// 1. Search Student
exports.searchStudentForFee = async (req, res) => {
  try {
    const { schoolId, search } = req.query;
    const student = await Student.findOne({
      schoolId,
      $or: [{ rollNo: search }, { name: search }]
    });

    if (!student) return res.status(404).json({ success: false, message: "Student Not Found" });

    // Dummy due amount logic (Real app me database se aayega)
    const dueAmount = student.dueAmount !== undefined ? student.dueAmount : 2500;

    res.json({ success: true, data: { ...student._doc, dueAmount } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Collect Fee
exports.collectFee = async (req, res) => {
  try {
    const { schoolId, studentId, amount, mode, studentName, classId } = req.body;

    const newReceipt = new FeeRecord({
      schoolId, studentId, studentName, classId, amount, mode,
      receiptNo: `RCP-${Date.now().toString().slice(-6)}`
    });
    await newReceipt.save();

    res.json({ success: true, message: "Fee Collected Successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Recent Fees
exports.getRecentFees = async (req, res) => {
  try {
    const fees = await FeeRecord.find({ schoolId: req.params.schoolId }).sort({ date: -1 }).limit(5);
    res.json({ success: true, data: fees });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// 4. Defaulters
exports.getDefaulters = async (req, res) => {
  try {
    // Dummy logic: Return all students for now
    const students = await Student.find({ schoolId: req.params.schoolId }).limit(5);
    res.json({ success: true, data: students });
  } catch (err) { res.status(500).json({ error: err.message }); }
};