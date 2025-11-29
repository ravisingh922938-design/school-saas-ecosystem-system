import { useState, useEffect } from 'react';
import { useTerminology } from '../../contexts/TerminologyContext';
import { Search, FileText, User, UserCircle, Calendar, Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Sample data - replace with actual API calls
const sampleStudents = [
  { id: 1, rollNo: 'S1001', name: 'Rahul Sharma', fatherName: 'Vikram Sharma', dob: '2010-05-15', class: '10', section: 'A' },
  { id: 2, rollNo: 'S1002', name: 'Priya Patel', fatherName: 'Ramesh Patel', dob: '2011-03-22', class: '9', section: 'B' },
  { id: 3, rollNo: 'S1003', name: 'Amit Kumar', fatherName: 'Sanjay Kumar', dob: '2010-11-08', class: '10', section: 'A' },
  { id: 4, rollNo: 'S1004', name: 'Neha Gupta', fatherName: 'Rajesh Gupta', dob: '2011-07-30', class: '9', section: 'C' },
  { id: 5, rollNo: 'S1005', name: 'Sonia Verma', fatherName: 'Vikram Verma', dob: '2010-09-12', class: '10', section: 'B' },
];

const certificateTemplates = {
  tc: {
    title: 'TRANSFER CERTIFICATE',
    content: `This is to certify that [Student Name], [son/daughter] of [Father's Name], was a bonafide student of this school. [He/She] was studying in Class [Class]-[Section] during the academic year [Year]. [He/She] was assigned Roll No. [Roll No.] and Date of Birth is [DOB].

[He/She] bears a good moral character. [His/Her] conduct and behavior during [his/her] stay in the school was found to be satisfactory in all respects.

[He/She] has paid all the dues to the school. We wish [him/her] success in [his/her] future endeavors.`,
    footer: 'Principal\n[School Name]\n[School Address]\n[Contact Info]',
    fields: ['name', 'fatherName', 'class', 'section', 'rollNo', 'dob']
  },
  bonafide: {
    title: 'BONAFIDE CERTIFICATE',
    content: `This is to certify that [Student Name], [son/daughter] of [Father's Name], is a bonafide student of this school. [He/She] is currently studying in Class [Class]-[Section] and has been assigned Roll No. [Roll No]. [His/Her] Date of Birth is [DOB] as per school records.

This certificate is being issued at [his/her] request for the purpose of [Purpose].`,
    footer: 'Principal\n[School Name]\n[School Address]\n[Contact Info]',
    fields: ['name', 'fatherName', 'class', 'section', 'rollNo', 'dob']
  },
  character: {
    title: 'CHARACTER CERTIFICATE',
    content: `This is to certify that [Student Name], [son/daughter] of [Father's Name], was a student of this school from [Admission Date] to [Current Date]. [He/She] was studying in Class [Class]-[Section] and was assigned Roll No. [Roll No].

During [his/her] stay at the school, [he/she] has shown good moral character and has been regular and punctual in attendance. [His/Her] conduct and behavior have been found to be satisfactory in all respects.

This certificate is issued at [his/her] request for the purpose of [Purpose].`,
    footer: 'Principal\n[School Name]\n[School Address]\n[Contact Info]',
    fields: ['name', 'fatherName', 'class', 'section', 'rollNo']
  }
};

// PDF Document Component
const CertificatePDF = ({ student, certificateType, currentDate }) => {
  const { terms } = useTerminology();
  const template = certificateTemplates[certificateType];
  
  // Replace placeholders with actual student data
  const replacePlaceholders = (text) => {
    if (!student) return text;
    
    const gender = student.gender || 'he/she';
    const genderPosessive = student.gender === 'female' ? 'her' : 'his';
    
    return text
      .replace(/\[Student Name\]/g, student.name || '[Student Name]')
      .replace(/\[Father's Name\]/g, student.fatherName || "[Father's Name]")
      .replace(/\[Father's Name\]/g, student.fatherName || "[Father's Name]")
      .replace(/\[son\/daughter\]/g, gender === 'female' ? 'daughter' : 'son')
      .replace(/\[He\/She\]/g, gender === 'female' ? 'She' : 'He')
      .replace(/\[he\/she\]/g, gender === 'female' ? 'she' : 'he')
      .replace(/\[His\/Her\]/g, gender === 'female' ? 'Her' : 'His')
      .replace(/\[his\/her\]/g, genderPosessive)
      .replace(/\[Class\]/g, student.class || '[Class]')
      .replace(/\[Section\]/g, student.section || '[Section]')
      .replace(/\[Roll No\.\]/g, student.rollNo || '[Roll No.]')
      .replace(/\[DOB\]/g, student.dob ? new Date(student.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '[DOB]')
      .replace(/\[Year\]/g, new Date().getFullYear())
      .replace(/\[Current Date\]/g, currentDate)
      .replace(/\[Admission Date\]/g, student.admissionDate || '[Admission Date]')
      .replace(/\[School Name\]/g, 'ABC Public School')
      .replace(/\[School Address\]/g, '123 Education Street, Knowledge City, 560001')
      .replace(/\[Contact Info\]/g, 'Phone: +91 80 1234 5678 | Email: info@abcschool.edu.in');
  };

  // Split content into paragraphs
  const contentParagraphs = template.content.split('\n\n');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>ABC PUBLIC SCHOOL</Text>
          <Text style={styles.schoolAddress}>123 Education Street, Knowledge City, 560001</Text>
          <Text style={styles.certificateTitle}>{template.title}</Text>
        </View>
        
        <View style={styles.content}>
          {contentParagraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {replacePlaceholders(paragraph)}
            </Text>
          ))}
        </View>
        
        <View style={styles.footer}>
          <View style={styles.signatureBox}>
            <Text style={styles.date}>Date: {currentDate}</Text>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Principal</Text>
            <Text style={styles.schoolName}>ABC Public School</Text>
          </View>
        </View>
        
        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>ABC PUBLIC SCHOOL</Text>
        </View>
      </Page>
    </Document>
  );
};

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    position: 'relative',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: 20,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  schoolAddress: {
    fontSize: 10,
    marginBottom: 10,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 10,
  },
  content: {
    marginTop: 20,
    lineHeight: 1.5,
    fontSize: 12,
  },
  paragraph: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signatureBox: {
    textAlign: 'center',
  },
  signatureLine: {
    width: 200,
    height: 1,
    backgroundColor: '#000',
    margin: '5px 0',
  },
  signatureText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    marginBottom: 30,
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: -1,
    transform: 'rotate(-45deg)',
  },
  watermarkText: {
    fontSize: 80,
    color: '#999',
    textAlign: 'center',
  },
});

const CertificateGenerator = () => {
  const { terms } = useTerminology();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [certificateType, setCertificateType] = useState('tc');
  const [purpose, setPurpose] = useState('');
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  
  const certificateRef = React.useRef();
  
  // Filter students based on search term
  const filteredStudents = searchTerm
    ? sampleStudents.filter(
        student =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  // Handle print
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `${certificateType.toUpperCase()}_${selectedStudent?.name.replace(/\s+/g, '_')}`,
  });
  
  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchTerm('');
  };
  
  // Get certificate template based on type
  const getTemplate = () => {
    if (!selectedStudent) return '';
    
    const template = certificateTemplates[certificateType].content;
    const gender = selectedStudent.gender || 'he/she';
    
    return template
      .replace(/\[Student Name\]/g, selectedStudent.name)
      .replace(/\[Father's Name\]/g, selectedStudent.fatherName)
      .replace(/\[son\/daughter\]/g, gender === 'female' ? 'daughter' : 'son')
      .replace(/\[He\/She\]/g, gender === 'female' ? 'She' : 'He')
      .replace(/\[he\/she\]/g, gender === 'female' ? 'she' : 'he')
      .replace(/\[His\/Her\]/g, gender === 'female' ? 'Her' : 'His')
      .replace(/\[his\/her\]/g, gender === 'female' ? 'her' : 'his')
      .replace(/\[Class\]/g, selectedStudent.class || 'N/A')
      .replace(/\[Section\]/g, selectedStudent.section || 'N/A')
      .replace(/\[Roll No\.\]/g, selectedStudent.rollNo || 'N/A')
      .replace(/\[DOB\]/g, selectedStudent.dob ? new Date(selectedStudent.dob).toLocaleDateString() : 'N/A')
      .replace(/\[Year\]/g, new Date().getFullYear())
      .replace(/\[Current Date\]/g, currentDate)
      .replace(/\[Admission Date\]/g, selectedStudent.admissionDate || 'N/A')
      .replace(/\[Purpose\]/g, purpose || 'general purpose')
      .replace(/\[School Name\]/g, 'ABC Public School')
      .replace(/\[School Address\]/g, '123 Education Street, Knowledge City, 560001')
      .replace(/\[Contact Info\]/g, 'Phone: +91 80 1234 5678 | Email: info@abcschool.edu.in');
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Certificate Generator</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and print various school certificates for students
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Certificate Details</h2>
          
          {/* Student Search */}
          <div className="mb-6">
            <label htmlFor="student-search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Student
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="student-search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by name or roll number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Search Results Dropdown */}
            {searchTerm && filteredStudents.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="cursor-pointer hover:bg-gray-100 text-gray-900 hover:text-gray-900 px-4 py-2 text-sm"
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-gray-500">Roll No: {student.rollNo} | Class: {student.class}-{student.section}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Selected Student Info */}
            {selectedStudent && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <UserCircle className="h-10 w-10 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedStudent.name}</h4>
                    <p className="text-sm text-gray-600">
                      {terms.class} {selectedStudent.class}-{selectedStudent.section} | Roll No: {selectedStudent.rollNo}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedStudent(null)}
                >
                  Change student
                </button>
              </div>
            )}
          </div>
          
          {/* Certificate Type */}
          <div className="mb-6">
            <label htmlFor="certificate-type" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Type
            </label>
            <select
              id="certificate-type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              disabled={!selectedStudent}
            >
              <option value="tc">Transfer Certificate (TC)</option>
              <option value="bonafide">Bonafide Certificate</option>
              <option value="character">Character Certificate</option>
            </select>
          </div>
          
          {/* Purpose (for certain certificates) */}
          {certificateType !== 'tc' && (
            <div className="mb-6">
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <input
                type="text"
                id="purpose"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Scholarship application"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                disabled={!selectedStudent}
              />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!selectedStudent ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedStudent}
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Certificate
            </button>
            
            {selectedStudent && (
              <PDFDownloadLink
                document={
                  <CertificatePDF 
                    student={selectedStudent} 
                    certificateType={certificateType} 
                    currentDate={currentDate} 
                  />
                }
                fileName={`${certificateType.toUpperCase()}_${selectedStudent.name.replace(/\s+/g, '_')}.pdf`}
                className="w-full"
              >
                {({ blob, url, loading, error }) => (
                  <button
                    type="button"
                    className={`w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            )}
          </div>
          
          {/* Help Text */}
          <div className="mt-8 p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please verify all the details in the preview before printing or downloading the certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {certificateType === 'tc' && 'Transfer Certificate'}
                {certificateType === 'bonafide' && 'Bonafide Certificate'}
                {certificateType === 'character' && 'Character Certificate'}
                {selectedStudent && ` for ${selectedStudent.name}`}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Preview of the certificate
              </p>
            </div>
            
            <div className="p-6">
              {selectedStudent ? (
                <div 
                  ref={certificateRef}
                  className="bg-white border border-gray-200 p-8 max-w-4xl mx-auto"
                  style={{ minHeight: '600px', position: 'relative' }}
                >
                  {/* Certificate Content */}
                  <div className="text-center mb-8">
                    <h1 className="text-xl font-bold mb-2">ABC PUBLIC SCHOOL</h1>
                    <p className="text-xs text-gray-600 mb-1">123 Education Street, Knowledge City, 560001</p>
                    <p className="text-xs text-gray-600 mb-4">Phone: +91 80 1234 5678 | Email: info@abcschool.edu.in</p>
                    
                    <div className="border-t border-b border-gray-300 py-2 my-4">
                      <h2 className="text-lg font-bold">
                        {certificateType === 'tc' && 'TRANSFER CERTIFICATE'}
                        {certificateType === 'bonafide' && 'BONAFIDE CERTIFICATE'}
                        {certificateType === 'character' && 'CHARACTER CERTIFICATE'}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
                    {getTemplate().split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-right">
                    <div className="inline-block text-center">
                      <div className="border-t border-gray-400 w-48 mx-auto my-2"></div>
                      <p className="text-sm font-medium">Principal</p>
                      <p className="text-xs">ABC Public School</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    Generated on: {currentDate}
                  </div>
                  
                  {/* Watermark */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-6xl font-bold opacity-20 pointer-events-none whitespace-nowrap"
                    style={{ zIndex: -1 }}
                  >
                    ABC PUBLIC SCHOOL
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No student selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Search and select a student to preview the certificate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
