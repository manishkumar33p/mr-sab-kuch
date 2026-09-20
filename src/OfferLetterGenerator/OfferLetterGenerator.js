import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./OfferLetterGenerator.css";

const COMPANY = {
  name: "NISS TECHNOLOGY",
  tagline: "NEW INDIA SOFTWARE SOLUTIONS",
  phone: "+91 9958424916",
  email: "info@nisstechnology.com",
  website: "www.nisstechnology.com",
  gstin: "09OCLPS5187R1ZX",

  address:
    "Ground Floor, 122A, New Gandhi Nagar, Golei Chandi, Nehru Nagar II, Ghaziabad, Uttar Pradesh 201001",
};

const defaultForm = {
  staffId: "",
  name: "",
  mobile: "",
  email: "",
  designation: "Field Staff",
  department: "Field Operations",
  joiningDate: "",
  workLocation: "Ghaziabad / As Assigned",
  reportingTo: "Field Operations Manager",
  monthlyTarget: "50000",
  fixedPay: "10000",
  incentive: "As per company policy",
  engagement: "Full Time",
};

function OfferLetterGenerator() {
  const letterRef = useRef(null);

  const [form, setForm] = useState(defaultForm);
  const [signature, setSignature] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  // Load saved signature
  useEffect(() => {
    const savedSignature = localStorage.getItem("niss_ceo_signature");

    if (savedSignature) {
      setSignature(savedSignature);
    }
  }, []);

  // Load staff by ID
  const loadStaff = () => {
    const id = form.staffId.trim();

    if (!id) {
      alert("पहले Staff ID डालिए।");
      return;
    }

    const saved = localStorage.getItem(`niss_staff_${id}`);

    if (saved) {
      try {
        setForm(JSON.parse(saved));
        setSavedMessage("Previous staff record loaded.");
      } catch (error) {
        console.error(error);
      }
    } else {
      setSavedMessage("New staff record.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("कृपया signature की image upload करें।");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      setSignature(result);
      localStorage.setItem("niss_ceo_signature", result);
    };

    reader.readAsDataURL(file);
  };

  const saveStaff = () => {
    if (!form.staffId.trim()) {
      alert("Staff ID डालना जरूरी है।");
      return false;
    }

    if (!form.name.trim()) {
      alert("Staff Name डालना जरूरी है।");
      return false;
    }

    localStorage.setItem(
      `niss_staff_${form.staffId.trim()}`,
      JSON.stringify(form)
    );

    setSavedMessage("Staff record saved successfully.");

    return true;
  };

  const generatePDF = async () => {
    const saved = saveStaff();

    if (!saved) return;

    if (!letterRef.current) return;

    const element = letterRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("logo30/png", 0.95);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    const safeName = form.name
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "_");

    const safeId = form.staffId
      .trim()
      .replace(/[^a-zA-Z0-9-]+/g, "_");

    pdf.save(
      `NISS_Offer_Letter_${safeId}_${safeName}.pdf`
    );
  };

  const clearForm = () => {
    setForm(defaultForm);
    setSavedMessage("");
  };

  const formattedDate = form.joiningDate
    ? new Date(form.joiningDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "________________";

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="offer-generator">

      {/* ================= ADMIN FORM ================= */}

      <div className="generator-panel">

        <div className="generator-heading">
          <h1>Offer Letter Generator</h1>
          <p>
            NISS TECHNOLOGY — Staff Offer Letter
          </p>
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Staff / Employee ID *</label>

            <div className="id-search">
              <input
                type="text"
                name="staffId"
                value={form.staffId}
                onChange={handleChange}
                placeholder="FS-001"
              />

              <button
                type="button"
                onClick={loadStaff}
              >
                Load
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Staff Name *</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="staff@email.com"
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Designation</label>

            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Joining Date</label>

            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Work Location</label>

            <input
              type="text"
              name="workLocation"
              value={form.workLocation}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Reporting To</label>

            <input
              type="text"
              name="reportingTo"
              value={form.reportingTo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Monthly Revenue Target</label>

            <input
              type="number"
              name="monthlyTarget"
              value={form.monthlyTarget}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-row">

          {/* <div className="form-group">
            <label>Monthly Fixed Pay</label>

            <input
              type="number"
              name="fixedPay"
              value={form.fixedPay}
              onChange={handleChange}
            />
          </div> */}

          <div className="form-group">
            <label>Performance Incentive</label>

            <input
              type="text"
              name="incentive"
              value={form.incentive}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group full">
          <label>Mode of Engagement</label>

          <select
            name="engagement"
            value={form.engagement}
            onChange={handleChange}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        {/* Signature */}

        <div className="signature-upload-box">

          <label>
            Authorized Signatory Signature
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleSignatureUpload}
          />

          <small>
            अपनी authorized signature की image एक बार upload करें।
            यह browser में save रहेगी।
          </small>

          {signature && (
            <div className="signature-preview">
              <img
                src={signature}
                alt="Authorized Signature"
              />
            </div>
          )}

        </div>

        <div className="generator-actions">

          <button
            type="button"
            className="save-btn"
            onClick={saveStaff}
          >
            Save / Update Staff
          </button>

          <button
            type="button"
            className="pdf-btn"
            onClick={generatePDF}
          >
            Generate Offer Letter PDF
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={clearForm}
          >
            New Letter
          </button>

        </div>

        {savedMessage && (
          <div className="saved-message">
            {savedMessage}
          </div>
        )}

      </div>


      {/* ================= OFFER LETTER ================= */}

      <div
        className="offer-paper"
        ref={letterRef}
      >

        {/* HEADER */}

        <div className="letter-header">

          <div className="brand-area">

            {/* <div className="brand-logo">
              <span className="brand-n">N</span>
              <div>
                <strong>NISS</strong>
                <b>TECHNOLOGY</b>
              </div>
            </div> */}

            <div className="brand-logo">
  <img
    src="/logo30.png"
    alt="NISS TECHNOLOGY"
    className="brand-logo-image"
  />
</div>

            <div className="tagline">
              NEW INDIA SOFTWARE SOLUTIONS
            </div>

          </div>

          <div className="company-contact">

            <div>
              📞 {COMPANY.phone}
            </div>

            <div>
              ✉ {COMPANY.email}
            </div>

            <div>
              🌐 {COMPANY.website}
            </div>

            <div>
              📍 {COMPANY.address}
            </div>

            <div className="gst">
              GSTIN: {COMPANY.gstin}
            </div>

          </div>

          {/* <div className="building-box">
            <div className="building-text">
              NISS
            </div>
          </div> */}

        </div>


        <div className="orange-line" />


        {/* LETTER META */}

        <div className="letter-meta">

          <div>
            <strong>Offer Letter No.:</strong>{" "}
            NISS/HR/2026-27/{form.staffId || "________"}
          </div>

          <div>
            <strong>Date:</strong> {today}
          </div>

        </div>


        {/* TITLE */}

        <div className="offer-title">

          <h1>OFFER LETTER</h1>

          <div className="title-decoration">
            <span />
            <b>◆</b>
            <span />
          </div>

        </div>


        {/* RECIPIENT */}

        <div className="recipient">

          <div>To,</div>

          <strong>
            {form.name
              ? `Mr./Ms. ${form.name}`
              : "Mr./Ms. __________________"}
          </strong>

          {/* <div>
            Mobile: {form.mobile || "________________"}
          </div>

          <div>
            Email: {form.email || "________________"}
          </div> */}

          <p>
            <strong>Subject:</strong>{" "}
            Offer of Engagement as{" "}
            <b>
              {form.designation || "Field Staff"}
            </b>
          </p>

        </div>


        {/* BODY */}

        <div className="letter-body">

          <p>
            Dear{" "}
            <strong>
              {form.name || "Candidate"}
            </strong>,
          </p>

          <p>
            We are pleased to offer you the position of{" "}
            <strong>
              {form.designation || "Field Staff"}
            </strong>{" "}
            with <strong>NISS TECHNOLOGY</strong>.
            We believe that your skills, knowledge and
            experience will be valuable assets to our
            organization.
          </p>

          <p>
            You are requested to go through the following
            terms and conditions of your engagement and
            signify your acceptance.
          </p>


          {/* DETAILS TABLE */}

          <table className="employee-table">

            <tbody>

              <tr>
                <td>Employee ID</td>
                <td>{form.staffId || "________"}</td>

                <td>Designation</td>
                <td>
                  {form.designation || "Field Staff"}
                </td>
              </tr>

              <tr>
                <td>Department</td>
                <td>{form.department || "Field Operations"}</td>

                <td>Joining Date</td>
                <td>{formattedDate}</td>
              </tr>

              <tr>
                <td>Work Location</td>
                <td>{form.workLocation || "As Assigned"}</td>

                <td>Reporting To</td>
                <td>
                  {form.reportingTo ||
                    "Field Operations Manager"}
                </td>
              </tr>

              <tr>
                <td>Monthly Revenue Target</td>
                <td>
                  ₹{" "}
                  {Number(form.monthlyTarget || 0).toLocaleString(
                    "en-IN"
                  )}
                </td>

                {/* <td>Monthly Fixed Pay</td>
                <td>
                  ₹{" "}
                  {Number(form.fixedPay || 0).toLocaleString(
                    "en-IN"
                  )}
                </td> */}
              </tr>

              <tr>
                <td>Performance Incentive</td>
                <td>{form.incentive}</td>

                <td>Mode of Engagement</td>
                <td>{form.engagement}</td>
              </tr>

            </tbody>

          </table>


          {/* TERMS */}

          <h3>TERMS & CONDITIONS:</h3>

          <ol className="terms">

            <li>
  This is a commission-based engagement and does not carry a fixed monthly
  salary. The remuneration payable to you will be based on the revenue
  generated by you, as per the revenue/commission structure communicated
  by NISS TECHNOLOGY. The applicable commission will be calculated and
  paid according to the company's prevailing policy and performance terms.
</li>

            <li>
              You will be responsible for field operations,
              vendor onboarding, client coordination and
              related activities as assigned by the company.
            </li>

            <li>
              You shall work towards the monthly revenue
              target and performance requirements applicable
              to your assigned role.
            </li>

            <li>
              Incentives / commissions will be paid as per
              the applicable company policy and performance
              criteria.
            </li>

            <li>
              You shall follow all company policies, code
              of conduct and maintain confidentiality of
              company data and information.
            </li>

            <li>
              The company reserves the right to modify
              assignments, targets and policies from time
              to time.
            </li>

            <li>
              In case of misconduct, non-performance or
              breach of company policy, the engagement may
              be reviewed or terminated as per applicable
              company policy and law.
            </li>

          </ol>


          <p className="closing-text">
            Kindly sign the copy of this letter as a token
            of your acceptance of the terms and conditions
            mentioned above and return the same.
          </p>

          <p>
            We look forward to a long and successful
            association with you.
          </p>

          <p>
            Best Regards,
          </p>


          {/* SIGNATURE SECTION */}

          <div className="signature-section">

            <div className="company-sign">

              <div>
                For <strong>NISS TECHNOLOGY</strong>
              </div>

              {signature ? (
                <img
                  className="signature-image"
                  src={signature}
                  alt="Authorized Signatory"
                />
              ) : (
                <div className="signature-placeholder">
                  Authorized Signatory
                </div>
              )}

              <strong>
                Manish Kumar Singh
              </strong>

              <span>CEO</span>

              <span>
                NISS TECHNOLOGY
              </span>

            </div>


            <div className="employee-sign">

              <p>
                I have read and understood the terms and
                conditions mentioned above. I accept this
                offer.
              </p>

              <div className="signature-line">
                Signature of Employee
              </div>

              <div>
                Name: ______________________________
              </div>

              <div>
                Date: ______________________________
              </div>

            </div>

          </div>

        </div>


        {/* WATERMARK */}

        <div className="watermark">
          NISS
        </div>


        {/* FOOTER */}

        <div className="letter-footer">

          <div className="footer-top">

            <div>
              <span>WEBSITE</span>
              <strong>{COMPANY.website}</strong>
            </div>

            <div>
              <span>EMAIL</span>
              <strong>{COMPANY.email}</strong>
            </div>

            <div>
              <span>HELPLINE</span>
              <strong>{COMPANY.phone}</strong>
            </div>

          </div>

          <div className="footer-bottom">

            <div className="registered-office">
              <span>📍 REGISTERED OFFICE</span>

              <p>
                {COMPANY.address}
              </p>
            </div>

            <div className="footer-gst">
              <strong>GSTIN:</strong>
              <span>{COMPANY.gstin}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OfferLetterGenerator;