// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MedChainRegistry is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _patientIdCounter;
    Counters.Counter private _doctorIdCounter;
    
    struct Patient {
        string patientId;
        address walletAddress;
        string encryptedData;
        bool isActive;
        uint256 registrationDate;
        string country;
        string state;
    }
    
    struct Doctor {
        string doctorId;
        address walletAddress;
        string licenseNumber;
        string specialization;
        string hospitalName;
        bool isVerified;
        uint256 registrationDate;
        string country;
        string state;
        uint256 consultationFee;
    }
    
    struct ConsentRecord {
        string patientId;
        string doctorId;
        string[] dataTypes;
        uint256 expiryDate;
        bool isActive;
        uint256 timestamp;
        string purpose;
    }
    
    struct AccessLog {
        string patientId;
        string doctorId;
        string accessType;
        uint256 timestamp;
        string ipfsHash;
    }
    
    struct Appointment {
        uint256 appointmentId;
        string patientId;
        string doctorId;
        uint256 scheduledTime;
        uint256 fee;
        bool isPaid;
        bool isCompleted;
        string notes;
        uint256 timestamp;
    }
    
    // Mappings
    mapping(string => Patient) public patients;
    mapping(string => Doctor) public doctors;
    mapping(address => string) public addressToPatientId;
    mapping(address => string) public addressToDoctorId;
    mapping(bytes32 => ConsentRecord) public consentRecords;
    mapping(uint256 => AccessLog) public accessLogs;
    mapping(uint256 => Appointment) public appointments;
    
    // Arrays for iteration
    string[] public allPatientIds;
    string[] public allDoctorIds;
    uint256[] public allAccessLogIds;
    uint256[] public allAppointmentIds;
    
    // Events
    event PatientRegistered(string indexed patientId, address indexed walletAddress, string country);
    event DoctorRegistered(string indexed doctorId, address indexed walletAddress, string country);
    event DoctorVerified(string indexed doctorId, address indexed verifier);
    event ConsentGranted(string indexed patientId, string indexed doctorId, bytes32 indexed consentHash);
    event ConsentRevoked(string indexed patientId, string indexed doctorId, bytes32 indexed consentHash);
    event DataAccessed(string indexed patientId, string indexed doctorId, uint256 indexed logId);
    event AppointmentBooked(uint256 indexed appointmentId, string indexed patientId, string indexed doctorId);
    event AppointmentCompleted(uint256 indexed appointmentId);
    event PaymentReceived(uint256 indexed appointmentId, uint256 amount);
    
    constructor() {}
    
    // Patient Registration
    function registerPatient(
        string memory _encryptedData,
        string memory _country,
        string memory _state
    ) external {
        require(bytes(addressToPatientId[msg.sender]).length == 0, "Patient already registered");
        
        _patientIdCounter.increment();
        string memory patientId = string(abi.encodePacked("PAT", _toString(_patientIdCounter.current())));
        
        patients[patientId] = Patient({
            patientId: patientId,
            walletAddress: msg.sender,
            encryptedData: _encryptedData,
            isActive: true,
            registrationDate: block.timestamp,
            country: _country,
            state: _state
        });
        
        addressToPatientId[msg.sender] = patientId;
        allPatientIds.push(patientId);
        
        emit PatientRegistered(patientId, msg.sender, _country);
    }
    
    // Doctor Registration
    function registerDoctor(
        string memory _licenseNumber,
        string memory _specialization,
        string memory _hospitalName,
        string memory _country,
        string memory _state,
        uint256 _consultationFee
    ) external {
        require(bytes(addressToDoctorId[msg.sender]).length == 0, "Doctor already registered");
        
        _doctorIdCounter.increment();
        string memory doctorId = string(abi.encodePacked("DOC", _toString(_doctorIdCounter.current())));
        
        doctors[doctorId] = Doctor({
            doctorId: doctorId,
            walletAddress: msg.sender,
            licenseNumber: _licenseNumber,
            specialization: _specialization,
            hospitalName: _hospitalName,
            isVerified: false,
            registrationDate: block.timestamp,
            country: _country,
            state: _state,
            consultationFee: _consultationFee
        });
        
        addressToDoctorId[msg.sender] = doctorId;
        allDoctorIds.push(doctorId);
        
        emit DoctorRegistered(doctorId, msg.sender, _country);
    }
    
    // Verify Doctor (only owner)
    function verifyDoctor(string memory _doctorId) external onlyOwner {
        require(bytes(doctors[_doctorId].doctorId).length > 0, "Doctor not found");
        doctors[_doctorId].isVerified = true;
        emit DoctorVerified(_doctorId, msg.sender);
    }
    
    // Grant Consent
    function grantConsent(
        string memory _doctorId,
        string[] memory _dataTypes,
        uint256 _expiryDate,
        string memory _purpose
    ) external {
        string memory patientId = addressToPatientId[msg.sender];
        require(bytes(patientId).length > 0, "Patient not registered");
        require(bytes(doctors[_doctorId].doctorId).length > 0, "Doctor not found");
        require(_expiryDate > block.timestamp, "Expiry date must be in future");
        
        bytes32 consentHash = keccak256(abi.encodePacked(patientId, _doctorId, block.timestamp));
        
        consentRecords[consentHash] = ConsentRecord({
            patientId: patientId,
            doctorId: _doctorId,
            dataTypes: _dataTypes,
            expiryDate: _expiryDate,
            isActive: true,
            timestamp: block.timestamp,
            purpose: _purpose
        });
        
        emit ConsentGranted(patientId, _doctorId, consentHash);
    }
    
    // Revoke Consent
    function revokeConsent(bytes32 _consentHash) external {
        string memory patientId = addressToPatientId[msg.sender];
        require(bytes(patientId).length > 0, "Patient not registered");
        require(keccak256(bytes(consentRecords[_consentHash].patientId)) == keccak256(bytes(patientId)), "Not authorized");
        
        consentRecords[_consentHash].isActive = false;
        emit ConsentRevoked(patientId, consentRecords[_consentHash].doctorId, _consentHash);
    }
    
    // Log Data Access
    function logDataAccess(
        string memory _patientId,
        string memory _accessType,
        string memory _ipfsHash
    ) external {
        string memory doctorId = addressToDoctorId[msg.sender];
        require(bytes(doctorId).length > 0, "Doctor not registered");
        require(doctors[doctorId].isVerified, "Doctor not verified");
        
        uint256 logId = allAccessLogIds.length + 1;
        
        accessLogs[logId] = AccessLog({
            patientId: _patientId,
            doctorId: doctorId,
            accessType: _accessType,
            timestamp: block.timestamp,
            ipfsHash: _ipfsHash
        });
        
        allAccessLogIds.push(logId);
        emit DataAccessed(_patientId, doctorId, logId);
    }
    
    // Book Appointment
    function bookAppointment(
        string memory _doctorId,
        uint256 _scheduledTime,
        string memory _notes
    ) external payable {
        string memory patientId = addressToPatientId[msg.sender];
        require(bytes(patientId).length > 0, "Patient not registered");
        require(bytes(doctors[_doctorId].doctorId).length > 0, "Doctor not found");
        require(doctors[_doctorId].isVerified, "Doctor not verified");
        require(_scheduledTime > block.timestamp, "Appointment time must be in future");
        require(msg.value >= doctors[_doctorId].consultationFee, "Insufficient payment");
        
        uint256 appointmentId = allAppointmentIds.length + 1;
        
        appointments[appointmentId] = Appointment({
            appointmentId: appointmentId,
            patientId: patientId,
            doctorId: _doctorId,
            scheduledTime: _scheduledTime,
            fee: msg.value,
            isPaid: true,
            isCompleted: false,
            notes: _notes,
            timestamp: block.timestamp
        });
        
        allAppointmentIds.push(appointmentId);
        
        emit AppointmentBooked(appointmentId, patientId, _doctorId);
        emit PaymentReceived(appointmentId, msg.value);
    }
    
    // Complete Appointment
    function completeAppointment(uint256 _appointmentId) external {
        string memory doctorId = addressToDoctorId[msg.sender];
        require(bytes(doctorId).length > 0, "Doctor not registered");
        require(keccak256(bytes(appointments[_appointmentId].doctorId)) == keccak256(bytes(doctorId)), "Not authorized");
        require(!appointments[_appointmentId].isCompleted, "Appointment already completed");
        
        appointments[_appointmentId].isCompleted = true;
        
        // Transfer payment to doctor
        payable(msg.sender).transfer(appointments[_appointmentId].fee);
        
        emit AppointmentCompleted(_appointmentId);
    }
    
    // Get Patient by Address
    function getPatientByAddress(address _address) external view returns (Patient memory) {
        string memory patientId = addressToPatientId[_address];
        require(bytes(patientId).length > 0, "Patient not found");
        return patients[patientId];
    }
    
    // Get Doctor by Address
    function getDoctorByAddress(address _address) external view returns (Doctor memory) {
        string memory doctorId = addressToDoctorId[_address];
        require(bytes(doctorId).length > 0, "Doctor not found");
        return doctors[doctorId];
    }
    
    // Get Doctors by Specialization
    function getDoctorsBySpecialization(string memory _specialization) external view returns (string[] memory) {
        string[] memory result = new string[](allDoctorIds.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < allDoctorIds.length; i++) {
            if (keccak256(bytes(doctors[allDoctorIds[i]].specialization)) == keccak256(bytes(_specialization)) && 
                doctors[allDoctorIds[i]].isVerified) {
                result[count] = allDoctorIds[i];
                count++;
            }
        }
        
        // Resize array
        string[] memory finalResult = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }
    
    // Get Doctors by Location
    function getDoctorsByLocation(string memory _country, string memory _state) external view returns (string[] memory) {
        string[] memory result = new string[](allDoctorIds.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < allDoctorIds.length; i++) {
            if (keccak256(bytes(doctors[allDoctorIds[i]].country)) == keccak256(bytes(_country)) &&
                keccak256(bytes(doctors[allDoctorIds[i]].state)) == keccak256(bytes(_state)) &&
                doctors[allDoctorIds[i]].isVerified) {
                result[count] = allDoctorIds[i];
                count++;
            }
        }
        
        // Resize array
        string[] memory finalResult = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }
    
    // Utility function to convert uint to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    // Emergency functions
    function emergencyPause() external onlyOwner {
        // Implementation for emergency pause
    }
    
    function emergencyUnpause() external onlyOwner {
        // Implementation for emergency unpause
    }
}