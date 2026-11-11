# Product Requirement Document (PRD)
## Graduation Presentation Generator (Pelantikan Dokter Spesialis Multi-Prodi)

---

## 1. Executive Summary
The **Graduation Presentation Generator** is a Google Apps Script (GAS) powered web application integrated with Google Sheets and Google Slides. It automates the creation of ceremonial graduation presentation decks for medical specialist inaugurations. The application generates individual candidate slides and signatory layouts per academic program (Prodi), synchronizing sequence and positioning strictly following the oath section ("Sumpah Dokter").

---

## 2. Product Objectives & Target Audience
### 2.1 Objectives
* Eliminate manual creation of 100+ graduation presentation slides.
* Maintain strict sequence rules based on presentation templates.
* Prevent placeholder leakage (e.g., empty signatory text tags or misaligned layout boxes).
* Ensure zero disruption to core template slides (Introductory, Oath, and Closing sections).

### 2.2 Target Audience
* Academic event organizers and administrative personnel managing medical specialist inauguration ceremonies.

---

## 3. Data Architecture & Source Specifications

### 3.1 Google Sheets (Data Sources)

#### 1. Tab: `TTD` (Signatory Layouts per Prodi)
* **Column A (`PRODI`)**: Name of the Study Program (e.g., Anestesiologi, Ilmu Kesehatan Anak).
* **Column B (`LAYOUT`)**: Number of signatory photos/slots needed on the slide (`1`, `2`, or `3`).
* **Column C (`NAMA_TTD`)**: Signatory full names & titles listed sequentially per line.

#### 2. Tab: `Wisudawan` (Graduates Biodata)
* **Headers Detected Dynamically**:
  * `NAMA`: Full name of the candidate doctor.
  * `TTL`: Place and date of birth.
  * `NAMA AYAH`: Father's name.
  * `NAMA IBU`: Mother's name.
  * `PRODI`: Study Program name (used for filtering per-Prodi sequences).

#### 3. Tab: `PENGATURAN` (Global Settings)
* `TANGGAL_COVER`: Date displayed on global covers/titles.

---

## 4. Google Slides Master Template Structure

The master presentation template (`TEMPLATE_ID: 1dh-tTb1LlIoLGGwI_JA0Ev-iS5ZTyToHQEDuvXdYBWM`) maintains an absolute physical structure:

| Slide Index | Content Type | Status | Description / Placeholder Tags |
| :--- | :--- | :--- | :--- |
| **Slide 1–3** | Cover & Introduction | Fixed | Global introduction, date placeholder `{{TANGGAL_COVER}}` |
| **Slide 4** | Master Biodata Candidate | Master (To Delete) | Candidate details: `{{NAMA}}`, `{{TTL}}`, `{{NAMA_AYAH}}`, `{{NAMA_IBU}}` |
| **Slide 5–15** | "Sumpah Dokter" Oath | Fixed | Core oath text (Ends at slide 15: *"Saya Ikrarkan JANJI ini..."*) |
| **Slide 16–17** | Transition / Intermission | **Anchor Point** | Slide 17 serves as the dynamic insertion anchor (`anchorSlide`) |
| **Slide 18** | Master TTD Layout 1 | Master (To Delete) | 1 Signatory slot (`{{PRODI}}`, `{{NAMA_TTD_1}}`) |
| **Slide 19** | Master TTD Layout 2 | Master (To Delete) | 2 Signatory slots (`{{PRODI}}`, `{{NAMA_TTD_1}}`, `{{NAMA_TTD_2}}`) |
| **Slide 20** | Master TTD Layout 3 | Master (To Delete) | 3 Signatory slots (`{{PRODI}}`, `{{NAMA_TTD_1}}`, `{{NAMA_TTD_2}}`, `{{NAMA_TTD_3}}`) |
| **Slide 21–23**| Closing Section | Fixed | Outro slides ("Terima Kasih") |

---

## 5. Functional & Logic Workflow

### 5.1 Presentation Generation Workflow

```
[Start Execution]
       │
       ▼
[Fetch Configuration & Form Input]
       │
       ▼
[Duplicate Master Presentation File]
       │
       ▼
[Identify Anchor Slide (Slide 17) & Masters]
       │
       ▼
[Loop per Prodi Group in TTD Sheet]
  ├── 1. Duplicate Master TTD Slide (Layout 1, 2, or 3)
  ├── 2. Replace {{PRODI}} and Signatory Names
  ├── 3. Move TTD Slide to current insertion index
  └── 4. Loop & Duplicate Candidate Biodata Slides for this Prodi
           ├── Replace {{NAMA}}, {{TTL}}, {{NAMA_AYAH}}, {{NAMA_IBU}}
           └── Move Candidate Slide to current insertion index
       │
       ▼
[Remove All Master Slides (Slide 4, 18, 19, 20)]
       │
       ▼
[Global Replacement of {{TANGGAL_COVER}}]
       │
       ▼
[Save Presentation & Return Output Web URL]
```

---

## 6. Detailed Requirements & Constraints

### 6.1 Placement & Sequencing Rules
1. **Strict Anchor Rule**: Generated content MUST be inserted after Slide 17 (Transition post-"Sumpah Dokter"). Under no circumstances should generated slides be placed before the Oath section.
2. **Prodi Grouping Order**:
   - `Slide TTD (Prodi A)` $\rightarrow$ `Slide Biodata Candidates (Prodi A)`
   - `Slide TTD (Prodi B)` $\rightarrow$ `Slide Biodata Candidates (Prodi B)`
   - ...Repeated sequentially for all active Prodis.

### 6.2 Data Mapping Rules
1. **Signatory Layouts**:
   - Layout `1`: Fills `{{NAMA_TTD_1}}`.
   - Layout `2`: Fills `{{NAMA_TTD_1}}` & `{{NAMA_TTD_2}}`.
   - Layout `3`: Fills `{{NAMA_TTD_1}}`, `{{NAMA_TTD_2}}`, & `{{NAMA_TTD_3}}`.
2. **Fallback Mechanisms**:
   - If form input is empty, fallback automatically to reading the `TTD` tab in Google Sheets.
   - If the anchor slide detection via text search fails, fallback to index `16` (Slide 17).
   - Master slide deletion occurs **only at the very end** of generation to prevent slide index shifting during processing.

---

## 7. Success Criteria
* **Accuracy**: Generated presentation contains 100% of candidates and signatories in exact Prodi grouping order.
* **Integrity**: Intro (1–3), Oath (5–15), Transition (16–17), and Outro (21–23) slides remain unedited and intact.
* **Cleanliness**: All template master slides are removed from the final output, leaving no leftover text placeholders (`{{TAG}}`).