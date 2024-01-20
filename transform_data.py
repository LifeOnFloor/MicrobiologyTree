import json

# Load the original data
with open('data/microorganisms.json', encoding='utf-8') as f:
    data = json.load(f)

# Define the categories
categories = ['Bacteria', 'Gram-positive', 'Coccus', 'Catalase-positive', 'Coagulase-positive']

# Initialize the hierarchical data structure
hierarchical_data = {
    'common_name': 'Microorganisms',
    'children': []
}

# Build the hierarchical data structure
for item in data:
    current_level = hierarchical_data['children']
    for category in categories:
        if category in item['class']:
            # Check if the category already exists at the current level
            existing_category = None
            for child in current_level:
                if child['common_name'] == category:
                    existing_category = child
                    break
            # If the category does not exist at the current level, create it
            if existing_category is None:
                existing_category = {
                    'common_name': category,
                    'children': []
                }
                current_level.append(existing_category)
            # Move to the next level
            current_level = existing_category['children']
    # Add the item to the current level
    current_level.append(item)

# Save the hierarchical data
with open('data/hierarchical_microorganisms.json', 'w', encoding='utf-8') as f:
    json.dump(hierarchical_data, f, indent=4, ensure_ascii=False)
