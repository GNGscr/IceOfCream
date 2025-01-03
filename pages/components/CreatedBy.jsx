const CreatedBy = () => {
  
  const handleGoToDeBrand = e => {
      // e.preventDefault(); // Prevent default anchor behavior
      console.log('set animation');
    }
    
    return (
        <a href={`https://debrand-design.vercel.app/` || `https://debrand-design-iipvd4tdx-debrand808-gmailcoms-projects.vercel.app/`}
        // <a href="https://debrand.design.com"
            rel="noopener noreferrer"
            target="_blank"
            id="created-by-anker"
            onClick={handleGoToDeBrand}>
            <div className="created-by-de">Created By</div>
            <span
              style={{opacity: 0.8}}
              className="debrand-logo text-[#ff0000] ml-[0.65rem] mr-1 font-bold"
              >
              <span className="text-[2.1rem] ml-[0.005rem] mt-[0.875rem] text-[#777]" style={{opacity: 1}}>*</span>
              <span className="text-[#ff0000]" style={{opacity: 0.9}}>D</span>
              <span className="text-[#c8bdb9]" style={{opacity: 0.9}}>E</span>
              <span className="brand">BRAND</span>
              <span className="text-[#fff] text-[2rem] mb-[0.85rem]">.</span>
              <span className="text-[#ff0000]" style={{opacity: 0.9}}>DESIGN</span>
                
              {/* <span className="text-[2rem] ml-[-0.025rem] mt-[0.785rem] text-[#fff]" style={{opacity: 1}}>*</span> */}
              <span className="text-[2.1rem] ml-[0.005rem] mt-[0.875rem] text-[#777]" style={{opacity: 1}}>*</span>
            </span>
      </a>
    )
}

export default CreatedBy;