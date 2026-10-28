
import ManagementPage from "./ManagementPage";

export default function PlacesManagement({ onBack }) {
  return (
    <ManagementPage
      title="Historic Places Management"
      endpoint="/api/admin/places"
      onBack={onBack}
      fields={[
        { name: "name", label: "Place Name" },
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
          placeholder: "https://example.com/place.jpg",
        },
      ]}
    />
  );
}