# Plan: E-Learn Dashboard Content & UI Optimization

This plan outlines the steps to enhance the VMC Academy (E-Learn) Dashboard by populating missing sub-pages, optimizing the UI for responsiveness, and refining the navigation.

## Objective
- Create and populate all relevant sub-pages for E-Learn (Courses, My Courses, Profile, Password, etc.).
- Refine the Dashboard UI to match the "Portal" quality (better layout, icons, and labels).
- Ensure high responsiveness and professional aesthetics.
- Fix navigation labels (e.g., "Profile" instead of "person profile").

## Proposed Architecture
The E-Learn section will be structured into a unified client-side dashboard with sub-tabs, similar to the main Portal, for a seamless experience.

### Sub-Tabs to Implement:
1. **Overview** (Existing Dashboard logic)
2. **Profile** (User details, bio, specialized training)
3. **Change Password** (Security settings)
4. **Order History** (Purchases/Enrolments)
5. **My Courses** (Personalized course tracking)
6. **All Courses** (Browsing library)

## Implementation Steps

### Phase 1: Create Content Components
1. Create `src/components/ElearnProfileContent.tsx`
2. Create `src/components/ElearnCoursesContent.tsx`
3. Create `src/components/ElearnMyCoursesContent.tsx`
4. Create `src/components/ElearnOrderHistoryContent.tsx`

### Phase 2: Refine `ElearnDashboardClient.tsx`
1. **Navigation Update**: 
   - Add icons to all menu items.
   - Fix labels (e.g., "Profile" instead of "person profile").
   - Implement state-based tab switching (Overview, Profile, etc.) instead of multi-page routing where appropriate for speed, or maintain routing if preferred (the user requested a "Portal-like" experience, which uses tab state).
2. **UI Optimization**:
   - Reduce sidebar header padding.
   - Center logo horizontally.
   - Improve mobile responsiveness (better drawer logic).
   - Use Lucide or React Icons (Fa) for consistency with the Portal.

### Phase 3: Update `src/app/elearn/dashboard/page.tsx`
1. Ensure the page correctly passes necessary props to the client component.
2. Maintain "no session check" mock data for development.

## Verification & Testing
- **Tab Test**: Verify all sidebar items correctly switch the main view.
- **Responsiveness Test**: Check layout on mobile, tablet, and desktop.
- **Visual Audit**: Ensure icons are consistent and labels are clean.
- **Data Check**: Verify all mock data (courses, profile) is realistic for VMC.
