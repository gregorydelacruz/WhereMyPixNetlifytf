import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmailPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: () => void; // No email parameter needed
};

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("🚀 Email popup closed. Opening file upload...");
    onClose(); // Close the popup
    onEmailSubmit(); // Trigger image upload (defined in parent component)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-2">Stay Updated!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Enter your email to continue (this won't be saved).
        </p>
<div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
  <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 600px;}
        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
    <form action="https://gregorydelacruz.us13.list-manage.com/subscribe/post?u=dc0338a6720ee1b0490b9e2eb&amp;id=c9ba2a17ee&amp;f_id=00847ce9f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
        <div id="mc_embed_signup_scroll"><h2>Subscribe</h2>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""></div>
<div hidden=""><input type="hidden" name="tags" value="6863173"></div>
        <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display: none;"></div>
            <div class="response" id="mce-success-response" style="display: none;"></div>
        </div><div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_dc0338a6720ee1b0490b9e2eb_c9ba2a17ee" tabindex="-1" value=""></div><div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
    </div>
</form>
</div>
<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>

        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <div className="flex justify-between mt-4">
          <Button onClick={onClose} variant="ghost" className="text-gray-500">
            Close
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
