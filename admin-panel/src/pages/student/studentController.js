// Dummy functions taaki server crash na ho

exports.getStudentProfile = async (req, res) => {
    res.status(200).json({ success: true, message: "Student Profile API working" });
};

exports.getStudentFees = async (req, res) => {
    res.status(200).json({ success: true, message: "Student Fees API working" });
};

exports.getStudentHomework = async (req, res) => {
    res.status(200).json({ success: true, message: "Student Homework API working" });
};

exports.getStudentResults = async (req, res) => {
    res.status(200).json({ success: true, message: "Student Results API working" });
};