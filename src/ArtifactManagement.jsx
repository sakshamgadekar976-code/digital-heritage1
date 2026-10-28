
import ManagementPage from "./ManagementPage";

export default function ArtifactManagement({ onBack }) {
  return (
    <ManagementPage
      title="Artifact Management"
      endpoint="/api/admin/artifacts"
      onBack={onBack}
      fields={[
        { name: "name", label: "Artifact Name" },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "museum",
          label: "Museum Name",
          required: false,
        },
        {
          name: "image",
          label: "Image URL",
          required: false,
          placeholder: "https://example.com/artifact.jpg",
        },
      ]}
    />
  );
}