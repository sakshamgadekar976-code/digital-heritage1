
import ManagementPage from "./ManagementPage";

export default function MuseumManagement({ onBack }) {
  return (
    <ManagementPage
      title="Museum Management"
      endpoint="/api/admin/museums"
      onBack={onBack}
      fields={[
        { name: "name", label: "Museum Name" },
        { name: "location", label: "Location" },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "image",
          label: "Image URL",
          required: false,
          placeholder: "https://example.com/museum.jpg",
        },
      ]}
    />
  );
}